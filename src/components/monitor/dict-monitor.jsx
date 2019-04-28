import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import styles from './monitor.css';
import DictMonitorScroller from './dict-monitor-scroller.jsx';

const Example = ({ data }) =>
  Object.entries(data).map(([k, v]) => (
    <div key={k}>
      {k}: {v}
    </div>
  ));

const DictMonitor = ({draggable, label, width, height, value, onResizeMouseDown, onAdd, ...rowProps}) => (
    <div
        className={styles.listMonitor}
        style={{
            width: `${width}px`,
            height: `${height}px`
        }}
    >
        <div className={styles.listBody}>
            <Example
                data={value}
            />
        </div>
    </div>
);

DictMonitor.propTypes = {
    activeIndex: PropTypes.number,
    categoryColor: PropTypes.string.isRequired,
    draggable: PropTypes.bool.isRequired,
    height: PropTypes.number,
    label: PropTypes.string.isRequired,
    onActivate: PropTypes.func,
    onAdd: PropTypes.func,
    onResizeMouseDown: PropTypes.func,
    value: PropTypes.objectOf(PropTypes.string), // TODO: Typecheck the members?
    width: PropTypes.number
};

DictMonitor.defaultProps = {
    width: 110,
    height: 200
};

export default DictMonitor;
