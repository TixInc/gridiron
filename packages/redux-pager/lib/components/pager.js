'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = pager;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var should = require('chai').should();

function nextDirection(direction) {
  switch (direction) {
    case 'asc':
      return 'desc';
    case 'desc':
      return null;
    default:
      return 'asc';
  }
}

function pager(pure) {
  var React = pure.React,
      PropTypes = pure.PropTypes,
      cloneElement = pure.cloneElement,
      connect = pure.connect,
      shallowCompare = pure.shallowCompare,
      Immutable = pure.Immutable,
      defaults = pure.defaults;
  var styles = defaults.styles,
      theme = defaults.theme;


  var desktopStyles = [styles.desktop, theme.desktop];
  var mobileStyles = [styles.mobile, theme.mobile];

  var contentShape = { FastBackward: PropTypes.any.isRequired,
    StepBackward: PropTypes.any.isRequired,
    StepForward: PropTypes.any.isRequired,
    FastForward: PropTypes.any.isRequired,
    PageStatus: PropTypes.any.isRequired,
    DocumentStatus: PropTypes.any.isRequired,
    DocumentCount: PropTypes.any.isRequired,
    selectOption: PropTypes.func.isRequired,
    documentsPerPageOption: PropTypes.func.isRequired
  };

  var propTypes = { children: PropTypes.func.isRequired,
    styles: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    columns: PropTypes.array,
    sort: PropTypes.object,
    createSortKeys: PropTypes.func.isRequired,
    createSortKeyComparator: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    documentsPerPage: PropTypes.any,
    documentsPerPageOptions: PropTypes.arrayOf(PropTypes.any).isRequired,
    typeSingular: PropTypes.string.isRequired,
    typePlural: PropTypes.string.isRequired,
    content: PropTypes.shape(contentShape).isRequired
    /** CREATES SORT KEYS FOR A DOCUMENT */
  };var defaultProps = _extends({ createSortKeys: function createSortKeys(cells, access) {
      var sort = access.sort;
      return sort.get('cols').filter(function (columnID) {
        return typeof sort.getIn(['direction', columnID]) === 'string';
      }).map(function (columnID) {
        var sortKey = sort.getIn(['keys', columnID], null);
        var cellDatum = cells.get(columnID);
        var currentKey = sortKey ? sortKey(cellDatum) : cellDatum;
        switch (typeof currentKey === 'undefined' ? 'undefined' : _typeof(currentKey)) {
          case 'number':
          case 'string':
            return currentKey;
          default:
            if (currentKey === null) return '';else return currentKey.toString();
        }
      });
    }
    /** COMPARES SORT KEYS OF TWO DOCUMENTS */
    , createSortKeyComparator: function createSortKeyComparator(access) {
      var sort = access.sort;
      var multipliers = sort.get('direction') ? sort.get('cols').map(function (columnID) {
        return sort.getIn(['direction', columnID]) === 'desc' ? -1 : 1;
      }) : [];
      return function (sortKeysA, sortKeysB) {
        for (var colIndex = 0; colIndex < sortKeysA.size; colIndex++) {
          var result = void 0;
          var keyA = sortKeysA.get(colIndex);
          var keyB = sortKeysB.get(colIndex);
          var multiplier = multipliers.get(colIndex);
          if (typeof keyA === 'number') {
            if (keyA > keyB) return 1 * multiplier;
            if (keyB > keyA) return -1 * multiplier;
            continue;
          }
          result = keyA.localeCompare(keyB) * multiplier;
          if (result !== 0) return result;
        }
        return 0;
      };
    },
    page: 0,
    documentsPerPage: null,
    documentsPerPageOptions: [1, 2, 3, 4, 5, 10, 25, 50, 100, 500, 1000, 'All'],
    typeSingular: 'document',
    typePlural: 'documents',
    content: { FastBackward: function FastBackward(_ref) {
        var status = _ref.status,
            props = _objectWithoutProperties(_ref, ['status']);

        return React.createElement('i', { className: 'fa fa-fast-backward' });
      },
      StepBackward: function StepBackward(_ref2) {
        var status = _ref2.status,
            props = _objectWithoutProperties(_ref2, ['status']);

        return React.createElement('i', { className: 'fa fa-step-backward' });
      },
      StepForward: function StepForward(_ref3) {
        var status = _ref3.status,
            props = _objectWithoutProperties(_ref3, ['status']);

        return React.createElement('i', { className: 'fa fa-step-forward' });
      },
      FastForward: function FastForward(_ref4) {
        var status = _ref4.status,
            props = _objectWithoutProperties(_ref4, ['status']);

        return React.createElement('i', { className: 'fa fa-fast-forward' });
      },
      PageStatus: function PageStatus(_ref5) {
        var status = _ref5.status,
            props = _objectWithoutProperties(_ref5, ['status']);

        return React.createElement(
          'span',
          { className: _classnames2.default.apply(undefined, [styles.pageStatus, theme.pageStatus].concat(desktopStyles)) },
          'Page ',
          (status.get('page') + 1).toLocaleString(),
          ' of ',
          status.get('pages')
        );
      },
      PageStatusMobile: function PageStatusMobile(_ref6) {
        var status = _ref6.status,
            props = _objectWithoutProperties(_ref6, ['status']);

        return React.createElement(
          'span',
          { className: _classnames2.default.apply(undefined, [styles.pageStatus, theme.pageStatus].concat(mobileStyles)) },
          (status.get('page') + 1).toLocaleString(),
          ' / ',
          status.get('pages')
        );
      },
      DocumentStatus: function DocumentStatus(_ref7) {
        var status = _ref7.status,
            props = _objectWithoutProperties(_ref7, ['status']);

        var lastIndex = status.get('lastIndex') ? status.get('lastIndex').toLocaleString() : 0;
        return React.createElement(
          'span',
          { className: _classnames2.default.apply(undefined, [styles.documentStatus, theme.documentStatus].concat(desktopStyles)) },
          'Showing ',
          props.typePlural,
          ' ',
          (status.get('startIndex') + 1).toLocaleString(),
          ' - ',
          lastIndex,
          ' of ',
          status.get('totalDocuments').toLocaleString()
        );
      },
      DocumentStatusMobile: function DocumentStatusMobile(_ref8) {
        var status = _ref8.status,
            props = _objectWithoutProperties(_ref8, ['status']);

        var lastIndex = status.get('lastIndex') ? status.get('lastIndex').toLocaleString() : 0;
        return React.createElement(
          'span',
          { className: _classnames2.default.apply(undefined, [styles.documentStatus, theme.documentStatus].concat(mobileStyles)) },
          (status.get('startIndex') + 1).toLocaleString(),
          ' - ',
          lastIndex,
          ' / ',
          status.get('totalDocuments').toLocaleString()
        );
      },
      DocumentCount: function DocumentCount(_ref9) {
        var status = _ref9.status,
            props = _objectWithoutProperties(_ref9, ['status']);

        return React.createElement(
          'span',
          { className: _classnames2.default.apply(undefined, [styles.documentCount, theme.documentCount].concat(desktopStyles)) },
          status.totalDocuments.toLocaleString(),
          ' ',
          status.get('totalDocuments') === 1 ? props.typeSingular : props.typePlural
        );
      },
      DocumentCountMobile: function DocumentCountMobile(_ref10) {
        var status = _ref10.status,
            props = _objectWithoutProperties(_ref10, ['status']);

        return React.createElement(
          'span',
          { className: _classnames2.default.apply(undefined, [styles.documentCount, theme.documentCount].concat(mobileStyles)) },
          status.totalDocuments.toLocaleString(),
          ' ',
          status.get('totalDocuments') === 1 ? props.typeSingular : props.typePlural
        );
      },
      selectOption: function selectOption(_ref11) {
        var index = _ref11.index,
            props = _objectWithoutProperties(_ref11, ['index']);

        return (index + 1).toLocaleString();
      },
      documentsPerPageOption: function documentsPerPageOption(_ref12) {
        var index = _ref12.index,
            props = _objectWithoutProperties(_ref12, ['index']);

        return typeof index === 'number' ? index.toLocaleString() : index;
      }
    }
  }, defaults);

  /** PRE REDUX (CONFIG) */
  var PagerContext = pure({ displayName: 'PagerContext',
    propTypes: propTypes,
    defaultProps: defaultProps,
    render: function render() {
      var _this = this;

      var _props = this.props,
          columns = _props.columns,
          map = _props.map,
          documentsPerPageOptions = _props.documentsPerPageOptions,
          createSortKeys = _props.createSortKeys,
          createSortKeyComparator = _props.createSortKeyComparator,
          childProps = _objectWithoutProperties(_props, ['columns', 'map', 'documentsPerPageOptions', 'createSortKeys', 'createSortKeyComparator']);

      return React.createElement(PagerDataFilter, _extends({}, childProps, {

        mapStateToDocumentData: function mapStateToDocumentData(state) {
          var documents = map.documents(state);
          if (!Immutable.Map.isMap(documents)) {
            console.warn('redux-pager: map.documents() should return an Immutable Map for best performance (converting...).');
            return Immutable.Map(documents);
          }
          return documents;
        },
        mapColumnData: function mapColumnData(documents) {
          if (columns) {
            should.exist(map.cells, 'map.cells function should exist when columns specified.');
            return documents.map(function (datum, documentID) {
              return map.cells(documentID, datum);
            });
          }
        }
        /** CALLED BY FILTER STREAM */
        , filterDocumentData: this.props.filterStream ? function (documentData, filterState) {
          if (filterState) {
            var anyFiltered = false;
            var filtered = documentData.filter(function (datum, documentID) {
              var value = Object.keys(filterState).some(function (columnID) {
                return filterState[columnID](documentID) === true;
              });
              if (value) anyFiltered = true;
              return value;
            });
            return anyFiltered ? filtered : documentData;
          }
          return documents;
        } : null
        /** MAP CELL AND SORT DATA AND ADD TO DATA CONSTRUCT */

        , mapData: function mapData(documentData, columnData, access) {
          var documents = documentData.map(function (datum, documentID) {
            var cells = columnData ? columnData.get(documentID) : null;
            var sortKeys = _this.props.sort ? createSortKeys(cells, access) : null;
            var context = Immutable.Map({ datum: datum, cells: cells, sortKeys: sortKeys });
            return context;
          });
          var data = Immutable.Map({ documents: documents, columns: columns });
          return data;
        },
        sortData: this.props.sort ? function (data, access) {
          var comparator = createSortKeyComparator(access);
          return data.set('documents', data.get('documents').sortBy(function (context, documentID) {
            return context.get('sortKeys');
          }, comparator));
        } : null,
        mapDataToStatus: function mapDataToStatus(data, access) {
          var sort = access.sort;
          var page = access.page;
          var documentsPerPage = access.documentsPerPage;
          var documents = data.get('documents');

          if (typeof documentsPerPage !== 'number') {
            return Immutable.Map({ data: data,
              startIndex: 0,
              lastIndex: documents.size,
              page: page,
              pages: 1,
              documentsPerPage: documentsPerPage,
              documentsPerPageOptions: documentsPerPageOptions,
              totalDocuments: documents.size,
              sort: sort
            });
          }

          var startIndex = page * documentsPerPage;
          var endIndex = (page + 1) * documentsPerPage;
          var pages = Math.ceil(documents.size / documentsPerPage);
          var documentSlice = documents.slice(startIndex, endIndex);
          var lastIndex = startIndex + (documentSlice.size || documentSlice.length);

          return Immutable.Map({ data: data.set('documents', documentSlice),
            page: page,
            pages: pages,
            startIndex: startIndex,
            lastIndex: lastIndex,
            documentsPerPage: documentsPerPage,
            documentsPerPageOptions: documentsPerPageOptions,
            totalDocuments: documents.size,
            sort: sort
          });
        },
        mapStatusToActions: function mapStatusToActions(status, access) {
          return { fastBackward: function fastBackward() {
              access.page = 0;
            },
            stepBackward: function stepBackward() {
              access.page = access.page - 1;
            },
            stepForward: function stepForward() {
              access.page = access.page + 1;
            },
            fastForward: function fastForward() {
              access.page = status.get('pages') - 1;
            },
            select: function select(x) {
              access.page = x;
            },
            documentsPerPage: function documentsPerPage(_documentsPerPage) {
              access.merge({ documentsPerPage: _documentsPerPage,
                page: 0
              });
            },
            sort: function sort(id) {
              var sort = access.sort;
              var _cols = sort.get('cols');
              var index = _cols.indexOf(id);
              if (index === -1) throw new Error('id ' + id + ' is not a sortable column.');
              var lastDirection = sort.getIn(['direction', id], null);
              var newDirection = nextDirection(lastDirection);
              var direction = sort.get('direction', Immutable.Map()).set(id, newDirection);
              var cols = newDirection ? _cols.delete(index).unshift(id) : _cols.delete(index).push(id);
              var newSort = sort.merge({ cols: cols, direction: direction });
              access.merge({ sort: newSort });
            }
          };
        }
      }));
    }
  });

  var PagerDataFilter = pure({ displayName: 'PagerDataFilter',
    propTypes: { mapStateToDocumentData: PropTypes.func.isRequired,
      mapColumnData: PropTypes.func.isRequired,
      filterStream: PropTypes.func,
      filterDocumentData: PropTypes.func
    },

    render: function render() {
      var _props2 = this.props,
          mapStateToDocumentData = _props2.mapStateToDocumentData,
          mapColumnData = _props2.mapColumnData,
          mapEarlyProps = _props2.mapEarlyProps,
          childProps = _objectWithoutProperties(_props2, ['mapStateToDocumentData', 'mapColumnData', 'mapEarlyProps']);

      var documentData = mapStateToDocumentData();
      var columnData = mapColumnData(documentData);
      var earlyProps = mapEarlyProps ? mapEarlyProps({ documentData: documentData, columnData: columnData }) : null;

      return React.createElement(PagerDocumentFilter, _extends({}, childProps, {
        earlyProps: earlyProps,
        documentData: documentData,
        columnData: columnData
      }));
    }
  });

  var PagerDocumentFilter = pure({ displayName: 'PagerDocumentFilter',
    propTypes: { documentData: PropTypes.object.isRequired,
      columnData: PropTypes.object,
      mapData: PropTypes.func.isRequired,
      sortData: PropTypes.func,
      mapDataToStatus: PropTypes.func.isRequired,
      mapStatusToActions: PropTypes.func.isRequired
    },
    state: { status: Immutable.Map(),
      filterState: null
    },
    init: function init() {
      var _this2 = this;

      var getProps = function getProps() {
        return _this2.props;
      };
      var getStatus = function getStatus(status) {
        return _this2.state.status;
      };
      var setStatus = function setStatus(status) {
        return _this2.setState({ status: status });
      };

      this.access = { get page() {
          return getStatus().get('page', getProps().page);
        },
        set page(value) {
          setStatus(getStatus().set('page', value));
        },
        get documentsPerPage() {
          return getStatus().get('documentsPerPage', getProps().documentsPerPage);
        },
        get sort() {
          return getStatus().get('sort', getProps().sort);
        },
        getSortDirection: function getSortDirection(id) {
          return getStatus().getIn(['sort', 'direction', id], null);
        },
        merge: function merge(value) {
          return setStatus(_this2.state.status.merge(value));
        }
      };
    },
    componentWillMount: function componentWillMount() {
      var _this3 = this;

      var _props3 = this.props,
          mapStateToDocumentData = _props3.mapStateToDocumentData,
          mapColumnData = _props3.mapColumnData,
          filterStream = _props3.filterStream,
          filterDocumentData = _props3.filterDocumentData,
          Filter = _props3.Filter;

      if (filterStream) this.unsubscribe = filterStream(function (filterState) {
        return _this3.setState({ filterState: filterState });
      });
    },
    componentWillUnmount: function componentWillUnmount() {
      // if(this.unsubscribe)
      //   this.unsubscribe()
    },
    render: function render() {
      var _props4 = this.props,
          documentData = _props4.documentData,
          columnData = _props4.columnData,
          filterDocumentData = _props4.filterDocumentData,
          mapData = _props4.mapData,
          sortData = _props4.sortData,
          sortDocuments = _props4.sortDocuments,
          mapDataToStatus = _props4.mapDataToStatus,
          mapStatusToActions = _props4.mapStatusToActions,
          mapLateProps = _props4.mapLateProps,
          earlyProps = _props4.earlyProps,
          childProps = _objectWithoutProperties(_props4, ['documentData', 'columnData', 'filterDocumentData', 'mapData', 'sortData', 'sortDocuments', 'mapDataToStatus', 'mapStatusToActions', 'mapLateProps', 'earlyProps']);

      var filterState = this.state.filterState;


      var filteredData = filterDocumentData && filterState ? filterDocumentData(documentData, filterState) : documentData;

      var rawData = mapData(filteredData, columnData, this.access);
      var data = sortData ? sortData(rawData, this.access) : rawData;
      var status = mapDataToStatus(data, this.access);
      var actions = mapStatusToActions(status, this.access);
      var lateProps = mapLateProps ? mapLateProps({ earlyProps: earlyProps, status: status, actions: actions }) : null;

      return React.createElement(Pager, _extends({}, childProps, {
        earlyProps: earlyProps,
        lateProps: lateProps,
        status: status,
        actions: actions
      }));
    }
  });

  var Pager = pure({ displayName: 'Pager',
    defaultProps: defaults,
    render: function render() {
      var _props5 = this.props,
          children = _props5.children,
          data = _props5.data,
          content = _props5.content,
          childProps = _objectWithoutProperties(_props5, ['children', 'data', 'content']);

      var status = childProps.status,
          actions = childProps.actions,
          styles = childProps.styles,
          theme = childProps.theme;


      return children(_extends({}, childProps, { Controls: function Controls(props) {
          return React.createElement(PagerControls, _extends({}, props, childProps, { content: content }));
        },
        Select: function Select(props) {
          return React.createElement(PagerSelect, _extends({}, props, childProps, { content: content }));
        },
        DocumentsPerPage: function DocumentsPerPage(props) {
          return React.createElement(PagerDocumentsPerPage, _extends({}, props, childProps, { content: content }));
        },
        PageStatus: function PageStatus(props) {
          return React.createElement(PagerStatus, _extends({}, props, childProps, { styleName: 'pagerPageStatus', Content: content.PageStatus, ContentMobile: content.PageStatusMobile }));
        },
        DocumentStatus: function DocumentStatus(props) {
          return React.createElement(PagerStatus, _extends({}, props, childProps, { styleName: 'pagerDocumentStatus', Content: content.DocumentStatus, ContentMobile: content.DocumentStatusMobile, style: props.style }));
        },
        DocumentCount: function DocumentCount(props) {
          return React.createElement(PagerStatus, _extends({}, props, childProps, { styleName: 'pagerDocumentCount', Content: content.DocumentCount, ContentMobile: content.DocumentCountMobile }));
        }
      }));
    }
  });

  var PagerControls = pure({ displayName: 'PagerControls',
    defaultProps: defaults,
    render: function render() {
      var _props6 = this.props,
          children = _props6.children,
          status = _props6.status,
          actions = _props6.actions,
          content = _props6.content,
          styles = _props6.styles,
          theme = _props6.theme;

      var buttonClass = (0, _classnames2.default)(styles.pagerButton, theme.pagerButton);
      return React.createElement(
        'span',
        { className: (0, _classnames2.default)(styles.pagerControls, theme.pagerControls) },
        React.createElement(
          'button',
          { onClick: actions.fastBackward, className: buttonClass, disabled: status.get('page') === 0 },
          React.createElement(content.FastBackward, this.props)
        ),
        ' ',
        React.createElement(
          'button',
          { onClick: actions.stepBackward, className: buttonClass, disabled: status.get('page') === 0 },
          React.createElement(content.StepBackward, this.props)
        ),
        ' ',
        children ? React.createElement(
          'span',
          { className: (0, _classnames2.default)(styles.pagerControlsChildren, theme.pagerControlsChildren) },
          children
        ) : null,
        ' ',
        React.createElement(
          'button',
          { onClick: actions.stepForward, className: buttonClass, disabled: status.get('page') === status.get('pages') - 1 },
          React.createElement(content.StepForward, this.props)
        ),
        ' ',
        React.createElement(
          'button',
          { onClick: actions.fastForward, className: buttonClass, disabled: status.get('page') === status.get('pages') - 1 },
          React.createElement(content.FastForward, this.props)
        )
      );
    }
  });

  var PagerSelect = pure({ displayName: 'PagerSelect',
    defaultProps: defaults,
    render: function render() {
      var _this4 = this;

      var _props7 = this.props,
          status = _props7.status,
          actions = _props7.actions,
          content = _props7.content,
          styles = _props7.styles,
          theme = _props7.theme;

      var documentsPerPage = status.get('documentsPerPage');
      var lastIndex = status.get('lastIndex') ? status.get('lastIndex').toLocaleString() : 0;
      return typeof documentsPerPage === 'number' && documentsPerPage > 0 ? React.createElement(
        'div',
        null,
        'Page',
        React.createElement(
          'select',
          {
            value: status.get('page'),
            onChange: function onChange(x) {
              return actions.select(parseInt(x.target.value));
            },
            className: (0, _classnames2.default)(styles.pagerSelect, theme.pagerSelect)
          },
          Array.from(Array(status.get('pages')).keys()).map(function (x) {
            return React.createElement(
              'option',
              { key: x, value: x },
              content.selectOption(_extends({}, _this4.props, { index: x }))
            );
          })
        ),
        'of ',
        lastIndex
      ) : React.createElement(
        'span',
        null,
        'All'
      );
    }
  });

  var PagerDocumentsPerPage = pure({ displayName: 'PagerDocumentsPerPage',
    defaultProps: defaults,
    render: function render() {
      var _this5 = this;

      var _props8 = this.props,
          label = _props8.label,
          status = _props8.status,
          actions = _props8.actions,
          content = _props8.content,
          styles = _props8.styles,
          theme = _props8.theme;

      return React.createElement(
        'span',
        { className: (0, _classnames2.default)(styles.pagerDocumentsPerPage, theme.pagerDocumentsPerPage) },
        label ? React.createElement(
          'label',
          { className: (0, _classnames2.default)(desktopStyles) },
          label
        ) : null,
        ' ',
        React.createElement(
          'select',
          {
            value: status.get('documentsPerPage'),
            onChange: function onChange(x) {
              var value = x.target.value;

              if (/\d+/.test(value)) actions.documentsPerPage(parseInt(value));else actions.documentsPerPage(value);
            },
            className: (0, _classnames2.default)(styles.pagerSelect, theme.pagerSelect)
          },
          status.get('documentsPerPageOptions').map(function (x) {
            return React.createElement(
              'option',
              { key: x, value: x },
              content.documentsPerPageOption(_extends({}, _this5.props, { index: x }))
            );
          })
        )
      );
    }
  });

  var PagerStatus = pure({ displayName: 'PagerStatus',
    defaultProps: defaults,
    render: function render() {
      var _props9 = this.props,
          styleName = _props9.styleName,
          Content = _props9.Content,
          ContentMobile = _props9.ContentMobile,
          className = _props9.className,
          status = _props9.status,
          actions = _props9.actions,
          content = _props9.content,
          styles = _props9.styles,
          theme = _props9.theme,
          style = _props9.style;

      return React.createElement(
        'div',
        { className: (0, _classnames2.default)(styles[styleName], theme[styleName]), style: style },
        React.createElement(Content, this.props),
        React.createElement(ContentMobile, this.props)
      );
    }
  });
  return PagerContext;
}