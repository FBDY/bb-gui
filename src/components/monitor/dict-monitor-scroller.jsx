import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import bindAll from 'lodash.bindall';
import {FormattedMessage} from 'react-intl';

import styles from './monitor.css';
import {List} from 'react-virtualized';

class DictMonitorScroller extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'rowRenderer',
            'noRowsRenderer',
            'handleEventFactory'
        ]);
    }
    handleEventFactory (index) {
        return () => this.props.onActivate(index);
    }
    noRowsRenderer () {
        return (
            <div className={classNames(styles.dictRow, styles.dictEmpty)}>
                <FormattedMessage
                    defaultMessage="(empty)"
                    description="Text shown on a dict monitor when a dict is empty"
                    id="gui.monitor.dictMonitor.empty"
                />
            </div>
        );
    }
    rowRenderer ({index, key, style}) {
        const [dictKey, dictValue] = this.props.values[index].split('➡');
        return (
            <div
                className={styles.dictRow}
                key={key}
                style={style}
            >
                <div className={styles.dictKey}>{dictKey}</div>
                <div
                    className={styles.dictValue}
                    dataIndex={index}
                    style={{background: this.props.categoryColor}}
                    onClick={this.props.draggable ? this.handleEventFactory(index) : null}
                >
                    {this.props.draggable && this.props.activeIndex === index ? (
                        <div className={styles.inputWrapper}>
                            <input
                                autoFocus
                                autoComplete={false}
                                className={classNames(styles.dictInput, 'no-drag')}
                                spellCheck={false}
                                type="text"
                                value={this.props.activeValue}
                                onBlur={this.props.onDeactivate}
                                onChange={this.props.onInput}
                                onFocus={this.props.onFocus}
                                onKeyDown={this.props.onKeyPress} // key down to get ahead of blur
                            />
                            <div
                                className={styles.removeButton}
                                onMouseDown={this.props.onRemove} // mousedown to get ahead of blur
                            >
                                {'✖︎'}
                            </div>
                        </div>

                    ) : (
                        <div className={styles.valueInner}>{dictValue}</div>
                    )}
                </div>
            </div>
        );
    }
    render () {
        const {height, values, width, activeIndex, activeValue} = this.props;
        // Keep the active index in view if defined, else must be undefined for List component
        const scrollToIndex = activeIndex === null ? undefined : activeIndex; /* eslint-disable-line no-undefined */
        return (
            <List
                activeIndex={activeIndex}
                activeValue={activeValue}
                height={(height) - 44 /* Header/footer size, approx */}
                noRowsRenderer={this.noRowsRenderer}
                rowCount={values.length}
                rowHeight={24 /* Row size is same for all rows */}
                rowRenderer={this.rowRenderer}
                scrollToIndex={scrollToIndex} /* eslint-disable-line no-undefined */
                values={values}
                width={width}
            />
        );
    }
}

DictMonitorScroller.propTypes = {
    activeIndex: PropTypes.number,
    activeValue: PropTypes.string,
    categoryColor: PropTypes.string,
    draggable: PropTypes.bool,
    height: PropTypes.number,
    onActivate: PropTypes.func,
    onDeactivate: PropTypes.func,
    onFocus: PropTypes.func,
    onInput: PropTypes.func,
    onKeyPress: PropTypes.func,
    onRemove: PropTypes.func,
    values: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string
    ])),
    width: PropTypes.number
};
export default DictMonitorScroller;
