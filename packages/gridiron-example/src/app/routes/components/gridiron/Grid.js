import pure from 'lib/modules/pure'
import { sandy, black, carbon, mellow } from 'gridiron-themes'

const { React, PropTypes, cloneElement, Immutable, gridiron, defaults } = pure
const { Pager, Grid, Columns, Accordion, Cards, Graph, Pre, formula } = gridiron
const { styles, theme } = defaults

const should = require('chai').should()

const getFormName = columnID => `filter-form-${columnID}`
const getFilterName = documentID => `filter_${documentID}`

const createFilterStream = columnIDs => {
  const formNames = columnIDs.map(getFormName)
  return onFilter => {
    const unsubscribe = formula.subscribe(formNames, formStates => {
      const filterState = columnIDs.reduce((result, columnID, i) => {
        const formState = formStates[i]
        const getFilterValue = documentID => formState ? formState.getIn([ getFilterName(documentID), 'value' ], false) : false
        return { ...result, [columnID]: getFilterValue }
      }, {})

      onFilter(filterState)
    })
    return unsubscribe
  }
}


const FilterForm = pure (
  { displayName: 'FilterForm'
  , propTypes:  { columnID: PropTypes.any
                , columnData: PropTypes.object.isRequired
                }
  , render() {
      const { columnData, columnID } = this.props
      const form = formula(getFormName(this.props.columnID))
      return (
        <div>
          {columnData.entrySeq().map(([ documentID, cells ], documentIndex) => {
            const cellDatum = cells.get(columnID)
            return (
              <form.Field key={documentIndex} name={getFilterName(documentID)} type="checkbox"><Pre>{cellDatum}</Pre></form.Field>
            )
          })}
        </div>
      )
    }
  }
)


export default pure ( pure.profiler,
  { displayName: 'Grid'
  , render() {
      const { container } = this.props
      const columns = Columns('id', 'state')

      return container(({ Controls, Box, isMaximized, id, actions }) => (
        <Pager
          documentsPerPage={5}
          columns={columns.ids}
          filterStream={createFilterStream(columns.ids)}

          map={ { documents: state => Immutable.Map.isMap(state) ? state : Immutable.Map(state)
                , cells: (documentID, datum) => Immutable.Map({ id: documentID, state: datum })
                }
              }

          /** EARLY PROPS ({ documents }) -> WILL BYPASS UPDATES IF DEFINED HERE */
          mapEarlyProps={
            ({ documents, columnData }) => {
              const columnFilters = columns.reduce(columnID => <FilterForm columnData={columnData} columnID={columnID} />)
              return { columnFilters }
            }
          }

          sort={Immutable.fromJS(
            { cols: columns.ids
            , keys: { id: datum => datum
                    , state: datum => Object.keys(datum).join('_')
                    }
            })
          }
        >
          {pager => (
            <Box>
              <Grid
                  data={pager.status.get('data', Immutable.Map())}
                  mapDocument={(
                    { header: ({ local, documentID, documentIndex, document }) => (
                        <h3>{documentID}</h3>
                      )
                    , footer: ({ local, documentID, documentIndex, document }) => (
                        <h5 style={{ float: 'right' }}>({documentIndex + 1})</h5>
                      )
                    }
                  )}
                  mapColumn={
                    { local: columnID => columns[columnID]
                    , header: ({ local, columnID, columnIndex }) => (
                        <local.Header
                          actions={pager.actions}
                          fields={{ checkbox: true
                                  //, radio: [ { yes: 'Yes', no: 'No' }, 'yes' ]
                                  , filter: true
                                  , sort: pager.status.get('sort')
                                  }}
                          paneContent={pager.earlyProps.columnFilters[columnID]}
                        >
                          {columnID}
                        </local.Header>
                      )
                    , footer: ({ local, columnID, columnIndex }) => (
                        <local.Footer />
                      )
                    }
                  }
                  mapCell={({ local, documentIndex, columnIndex, documentID, columnID, datum }) => (
                    <local.Cell documentID={documentID}>
                      <Pre>{{ documentIndex, columnIndex, documentID, columnID, datum }}</Pre>
                    </local.Cell>
                  )}

                  header={
                    [ <h2 key="title" style={{ margin: 0, letterSpacing: 6 }}>Grid</h2>
                    , <Controls key="maximize" />
                    ]
                  }
                  footer={[ (
                              <span key="footer-left">
                                <pager.Controls key="pager-buttons">
                                  <pager.Select />
                                </pager.Controls>
                              </span>
                            )
                          , (
                              <span key="footer-center">
                                <pager.DocumentStatus key="pager-row-status" />
                                <pager.PageStatus key="pager-page-status" />
                              </span>
                            )
                          , (
                              <span key="footer-right">
                                <pager.DocumentsPerPage label="Documents Per Page" key="documents-per-page" />
                              </span>
                            )
                          ]}
                  {...this.props}
                />
            </Box>
          )}
        </Pager>
      ))
    }
  }
)