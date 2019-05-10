import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import styles from './monitor.css';
import DictMonitorScroller from './dict-monitor-scroller.jsx';

const DictMonitor = ({draggable, label, width, height, value, onResizeMouseDown, ...rowProps}) => (
    <div
        className={styles.dictMonitor}
        style={{
            width: `${width}px`,
            height: `${height}px`
        }}
    >
        <div className={styles.dictHeader}>
            {label}
        </div>
        <div className={styles.dictBody}>
            <DictMonitorScroller
                draggable={draggable}
                height={height}
                values={value}
                width={width}
                {...rowProps}
            />
        </div>
        <div className={styles.dictFooter}>
            <div className={styles.footerLength}>
                <FormattedMessage
                    defaultMessage="length {length}"
                    description="Length label on dict monitors."
                    id="gui.monitor.dictMonitor.dictLength"
                    values={{
                        length: value.length
                    }}
                />
            </div>
            <div
                className={classNames(draggable ? styles.resizeHandle : null, 'no-drag')}
                onMouseDown={draggable ? onResizeMouseDown : null}
            >
                {'=' /* TODO waiting on asset */}
            </div>
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
    onResizeMouseDown: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string
        ]))
    ]),
    width: PropTypes.number
};

DictMonitor.defaultProps = {
    width: 110,
    height: 200
};

export default DictMonitor;
