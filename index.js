import React, { Component, Children, Fragment, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';

const CHECKABLE_BEHAVIOR_CHECKBOX = 'checkbox';
const CHECKABLE_BEHAVIOR_RADIO = 'radio';

const CHECKABLE_ITEM_TYPE_NORMAL = 'normal';
const CHECKABLE_ITEM_TYPE_WILDCARD = 'wildcard';

const COMP_NAME_ITEM = 'CheckableListItem';
const COMP_NAME_CHECKBOX = 'CheckableListItem.Checkbox';
const COMP_NAME_CONTENT = 'CheckableListItem.Content';

class Container extends Component {
  static propTypes = {
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  };

  render() {
    let { as: ContainerAs, children, ...rest } = this.props;
    return <ContainerAs {...rest}>{children}</ContainerAs>;
  }
}

class Checkbox extends Component {
  static propTypes = {
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.bool]),
    type: PropTypes.oneOf([CHECKABLE_ITEM_TYPE_NORMAL, CHECKABLE_ITEM_TYPE_WILDCARD]),
    behavior: PropTypes.oneOf([CHECKABLE_BEHAVIOR_CHECKBOX, CHECKABLE_BEHAVIOR_RADIO]),
    index: PropTypes.number,
    data: PropTypes.any,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    checkedClass: PropTypes.string,
    disabledClass: PropTypes.string,
    checkOnCheckbox: PropTypes.bool,
    checkItem: PropTypes.func,
    itemProps: PropTypes.object,
    containerProps: PropTypes.object,
    containerState: PropTypes.object,
  };

  static displayName = COMP_NAME_CHECKBOX;

  constructor(props) {
    super(props);

    this.handleCheckOnCheckbox = this.handleCheckOnCheckbox.bind(this);
  }

  getCheckboxCls() {
    let { checked, disabled, className, checkedClass, disabledClass } = this.props;
    return classnames(className, {
      [checkedClass]: checked,
      [disabledClass]: disabled,
    });
  }

  getRestProps() {
    return _.omit(this.props, [
      'as',
      'type',
      'behavior',
      'index',
      'data',
      'checked',
      'disabled',
      'checkedClass',
      'disabledClass',
      'checkOnCheckbox',
      'checkItem',
      'itemProps',
      'containerProps',
      'containerState',
      'children',
    ]);
  }

  handleCheckOnCheckbox(e) {
    e.stopPropagation();
    let { type, behavior, index, checked, disabled, checkOnCheckbox, checkItem, data } = this.props;
    if (!disabled && checkOnCheckbox) {
      checkItem(index, !checked, type, behavior, data);
    }
  }

  render() {
    let { as: CheckboxAs, index, children } = this.props;
    let checkboxContent = typeof children === 'function' ? children(index, this.props) : children;
    if (CheckboxAs === '') {
      return <Fragment>{checkboxContent}</Fragment>;
    }
    let checkboxProps = {
      ...this.getRestProps(),
      className: this.getCheckboxCls(),
      onClick: this.handleCheckOnCheckbox,
    };
    if (typeof CheckboxAs === 'boolean') {
      return checkboxContent ? cloneElement(Children.only(checkboxContent), checkboxProps) : null;
    }
    return <CheckboxAs {...checkboxProps}>{checkboxContent}</CheckboxAs>;
  }
}

class Content extends Component {
  static propTypes = {
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.bool]),
    type: PropTypes.oneOf([CHECKABLE_ITEM_TYPE_NORMAL, CHECKABLE_ITEM_TYPE_WILDCARD]),
    behavior: PropTypes.oneOf([CHECKABLE_BEHAVIOR_CHECKBOX, CHECKABLE_BEHAVIOR_RADIO]),
    index: PropTypes.number,
    data: PropTypes.any,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    checkedClass: PropTypes.string,
    disabledClass: PropTypes.string,
    checkOnContent: PropTypes.bool,
    checkItem: PropTypes.func,
    itemProps: PropTypes.object,
    containerProps: PropTypes.object,
    containerState: PropTypes.object,
  };

  static displayName = COMP_NAME_CONTENT;

  constructor(props) {
    super(props);

    this.handleCheckOnContent = this.handleCheckOnContent.bind(this);
  }

  getContentCls() {
    let { checked, disabled, className, checkedClass, disabledClass } = this.props;
    return classnames(className, {
      [checkedClass]: checked,
      [disabledClass]: disabled,
    });
  }

  getRestProps() {
    return _.omit(this.props, [
      'as',
      'type',
      'behavior',
      'index',
      'data',
      'checked',
      'disabled',
      'checkedClass',
      'disabledClass',
      'checkOnContent',
      'checkItem',
      'itemProps',
      'containerProps',
      'containerState',
      'children',
    ]);
  }

  handleCheckOnContent(e) {
    e.stopPropagation();
    let { type, behavior, index, checked, disabled, checkOnContent, checkItem, data } = this.props;
    if (!disabled && checkOnContent) {
      checkItem(index, !checked, type, behavior, data);
    }
  }

  render() {
    let { as: ContentAs, index, children } = this.props;
    let displayContent = typeof children === 'function' ? children(index, this.props) : children;
    if (ContentAs === '') {
      return <Fragment>{displayContent}</Fragment>;
    }
    let contentProps = {
      ...this.getRestProps(),
      className: this.getContentCls(),
      onClick: this.handleCheckOnContent,
    };
    if (typeof ContentAs === 'boolean') {
      return displayContent ? cloneElement(Children.only(displayContent), contentProps) : null;
    }
    return <ContentAs {...contentProps}>{displayContent}</ContentAs>;
  }
}

class CheckableListItem extends Component {
  static propTypes = {
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    type: PropTypes.oneOf([CHECKABLE_ITEM_TYPE_NORMAL, CHECKABLE_ITEM_TYPE_WILDCARD]),
    behavior: PropTypes.oneOf([CHECKABLE_BEHAVIOR_CHECKBOX, CHECKABLE_BEHAVIOR_RADIO]),
    index: PropTypes.number,
    data: PropTypes.any,
    defaultChecked: PropTypes.bool,
    defaultDisabled: PropTypes.bool,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    checkedClass: PropTypes.string,
    disabledClass: PropTypes.string,
    checkOnItem: PropTypes.bool,
    checkItem: PropTypes.func,
  };

  static defaultProps = {
    type: CHECKABLE_ITEM_TYPE_NORMAL,
    defaultChecked: false,
    defaultDisabled: false,
  };

  static displayName = COMP_NAME_ITEM;
  static Checkbox = Checkbox;
  static Content = Content;

  constructor(props) {
    super(props);

    this.handleCheckOnItem = this.handleCheckOnItem.bind(this);
  }

  getItemCls() {
    let { checked, disabled, className, checkedClass, disabledClass } = this.props;
    return classnames(className, {
      [checkedClass]: checked,
      [disabledClass]: disabled,
    });
  }

  getRestProps() {
    return _.omit(this.props, [
      'as',
      'type',
      'behavior',
      'index',
      'data',
      'defaultChecked',
      'defaultDisabled',
      'checked',
      'disabled',
      'checkedClass',
      'disabledClass',
      'checkOnItem',
      'checkItem',
      'children',
    ]);
  }

  handleCheckOnItem() {
    let { type, behavior, index, checked, disabled, checkOnItem, checkItem, data } = this.props;
    if (!disabled && checkOnItem) {
      checkItem(index, !checked, type, behavior, data);
    }
  }

  render() {
    let { as: ItemAs, children } = this.props;
    if (ItemAs === '') {
      return <Fragment>{children}</Fragment>;
    }
    let itemProps = {
      ...this.getRestProps(),
      className: this.getItemCls(),
      onClick: this.handleCheckOnItem,
    };
    return <ItemAs {...itemProps}>{children}</ItemAs>;
  }
}

class CheckableListGroup extends Component {
  static propTypes = {
    containerAs: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    itemAs: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    checkboxAs: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.bool]),
    contentAs: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.bool]),
    behavior: PropTypes.oneOf([CHECKABLE_BEHAVIOR_CHECKBOX, CHECKABLE_BEHAVIOR_RADIO]),
    itemClass: PropTypes.string,
    checkedItemClass: PropTypes.string,
    disabledItemClass: PropTypes.string,
    checkboxClass: PropTypes.string,
    checkedCheckboxClass: PropTypes.string,
    disabledCheckboxClass: PropTypes.string,
    contentClass: PropTypes.string,
    checkedContentClass: PropTypes.string,
    disabledContentClass: PropTypes.string,
    checkOnItem: PropTypes.bool,
    checkOnCheckbox: PropTypes.bool,
    checkOnContent: PropTypes.bool,
    behaviorFn: PropTypes.func,
    onBeforeCheck: PropTypes.func,
    onCheck: PropTypes.func,
  };

  static defaultProps = {
    containerAs: 'ul',
    itemAs: 'li',
    checkboxAs: false,
    contentAs: false,
    behavior: CHECKABLE_BEHAVIOR_CHECKBOX,
    itemClass: '',
    checkedItemClass: '',
    disabledItemClass: '',
    checkboxClass: '',
    checkedCheckboxClass: '',
    disabledCheckboxClass: '',
    contentClass: '',
    checkedContentClass: '',
    disabledContentClass: '',
    checkOnItem: true,
    checkOnCheckbox: true,
    checkOnContent: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      dataList: [],
      checkedDataList: [],
      validIndexes: [],
      normalIndexes: [],
      wildcardIndexes: [],
      checkedIndexes: [],
      disabledIndexes: [],
    };
    this.checkItem = this.checkItem.bind(this);
  }

  componentDidMount() {
    this.setInitStateFromProps();
  }

  componentWillReceiveProps(nextProps) {
    this.setInitStateFromProps(nextProps);
  }

  isValidItem(child) {
    return child && isValidElement(child) && child.type && child.type.displayName === COMP_NAME_ITEM;
  }

  isValidItemCheckbox(child) {
    return child && isValidElement(child) && child.type && child.type.displayName === COMP_NAME_CHECKBOX;
  }

  isValidItemContent(child) {
    return child && isValidElement(child) && child.type && child.type.displayName === COMP_NAME_CONTENT;
  }

  isNormalItem(child) {
    return this.isValidItem(child) && child && child.props && child.props.type === CHECKABLE_ITEM_TYPE_NORMAL;
  }

  isWildcardItem(child) {
    return this.isValidItem(child) && child && child.props && child.props.type === CHECKABLE_ITEM_TYPE_WILDCARD;
  }

  isDefaultCheckedItem(child) {
    return this.isValidItem(child) && child && child.props && child.props.defaultChecked;
  }

  isDefaultDisabledItem(child) {
    return this.isValidItem(child) && child && child.props && child.props.defaultDisabled;
  }

  isCheckedItem(child) {
    return this.isValidItem(child) && child && child.props && child.props.checked;
  }

  isDisabledItem(child) {
    return this.isValidItem(child) && child && child.props && child.props.disabled;
  }

  isShouldCheckedItem(index) {
    let { checkedIndexes = [] } = this.state || {};
    return checkedIndexes.indexOf(index) !== -1;
  }

  isShouldDisabledItem(index) {
    let { disabledIndexes = [] } = this.state || {};
    return disabledIndexes.indexOf(index) !== -1;
  }

  isBehaviorCheckbox() {
    let { behavior } = this.props || {};
    return (behavior || '').toLowerCase() === CHECKABLE_BEHAVIOR_CHECKBOX;
  }

  isBehaviorRadio() {
    let { behavior } = this.props || {};
    return (behavior || '').toLowerCase() === CHECKABLE_BEHAVIOR_RADIO;
  }

  isTypeNormal(type) {
    return (type || '').toLowerCase() === CHECKABLE_ITEM_TYPE_NORMAL;
  }

  isTypeWildcard(type) {
    return (type || '').toLowerCase() === CHECKABLE_ITEM_TYPE_WILDCARD;
  }

  getCheckedDataList(dataList, checkedIndexes) {
    return _.filter(dataList, (val, index) => checkedIndexes.indexOf(index) !== -1);
  }

  getInitStateFromProps(props) {
    let result = {
      dataList: [],
      checkedDataList: [],
      validIndexes: [],
      wildcardIndexes: [],
      normalIndexes: [],
      checkedIndexes: [],
      disabledIndexes: [],
    };
    let { children } = props || this.props;
    let childrenArr = Children.toArray(children);
    if (childrenArr && childrenArr.length) {
      for (let i = 0; i < childrenArr.length; i++) {
        let child = childrenArr[i];
        if (this.isValidItem(child)) {
          result.dataList.push(child.props.data);
          result.validIndexes.push(i);
        }
        if (this.isNormalItem(child)) {
          result.normalIndexes.push(i);
        }
        if (this.isWildcardItem(child)) {
          result.wildcardIndexes.push(i);
        }
        if (this.isDefaultCheckedItem(child)) {
          result.checkedIndexes.push(i);
        }
        if (this.isDefaultDisabledItem(child)) {
          result.disabledIndexes.push(i);
        }
      }
      result.checkedDataList = this.getCheckedDataList(result.dataList, result.checkedIndexes);
    }
    return result;
  }

  setInitStateFromProps(props) {
    this.setState(this.getInitStateFromProps(props));
  }

  getRestProps() {
    return _.omit(this.props, [
      'containerAs',
      'itemAs',
      'checkboxAs',
      'contentAs',
      'behavior',
      'itemClass',
      'checkedItemClass',
      'disabledItemClass',
      'checkboxClass',
      'checkedCheckboxClass',
      'disabledCheckboxClass',
      'contentClass',
      'checkedContentClass',
      'disabledContentClass',
      'checkOnItem',
      'checkOnCheckbox',
      'checkOnContent',
      'onBeforeCheck',
      'onCheck',
      'children',
    ]);
  }

  checkItem(index, checked, type, behavior, data) {
    let { behaviorFn, onBeforeCheck, onCheck } = this.props;
    let shouldCheck =
      !onBeforeCheck ||
      (typeof onBeforeCheck === 'function' &&
        onBeforeCheck({
          index,
          checked,
          type,
          behavior,
          data,
          props: this.props,
          state: this.state,
        }) !== false);

    if (shouldCheck) {
      let newCheckedIndexes;
      if (this.isBehaviorCheckbox()) {
        newCheckedIndexes = this.checkItemOfCheckboxBehavior(index, checked, type);
      } else if (this.isBehaviorRadio()) {
        newCheckedIndexes = this.checkItemOfRadioBehavior(index, checked);
      }

      if (typeof behaviorFn === 'function') {
        newCheckedIndexes = behaviorFn({
          index,
          checked,
          type,
          behavior,
          data,
          props: this.props,
          state: this.state,
          newCheckedIndexes,
        });
      }

      this.setState(
        {
          checkedIndexes: newCheckedIndexes,
          checkedDataList: this.getCheckedDataList(this.state.dataList, newCheckedIndexes),
        },
        () => {
          typeof onCheck === 'function' &&
            onCheck({
              index,
              checked,
              type,
              behavior,
              data,
              props: this.props,
              state: this.state,
            });
        },
      );
    }
  }

  checkItemOfCheckboxBehavior(index, checked, type) {
    let { checkedIndexes = [], wildcardIndexes = [], disabledIndexes = [] } = this.state || {};
    let foundIndex = checkedIndexes.indexOf(index);
    let disabledCheckedIndexes = _.intersection(checkedIndexes, disabledIndexes);
    let newCheckedIndexes = checkedIndexes.slice(0);
    if (checked) {
      if (foundIndex === -1) {
        if (this.isTypeNormal(type)) {
          newCheckedIndexes = _.filter([...newCheckedIndexes, index], i => wildcardIndexes.indexOf(i) === -1);
        } else if (this.isTypeWildcard(type)) {
          newCheckedIndexes = [...disabledCheckedIndexes, index];
        }
      }
    } else {
      if (foundIndex !== -1) {
        if (this.isTypeNormal(type)) {
          let tempCheckedIndexes = checkedIndexes.slice(0);
          tempCheckedIndexes.splice(foundIndex, 1);
          if (_.isEqual(_.sortBy(tempCheckedIndexes), _.sortBy(disabledCheckedIndexes))) {
            newCheckedIndexes = [...disabledCheckedIndexes, ...wildcardIndexes];
          } else {
            newCheckedIndexes = _.filter(tempCheckedIndexes, i => wildcardIndexes.indexOf(i) === -1);
          }
        } else if (this.isTypeWildcard(type)) {
          newCheckedIndexes = [...disabledCheckedIndexes, ...wildcardIndexes];
        }
      }
    }
    return _.uniq(newCheckedIndexes);
  }

  checkItemOfRadioBehavior(index, checked) {
    let { checkedIndexes = [], disabledIndexes = [] } = this.state || {};
    let foundIndex = checkedIndexes.indexOf(index);
    let disabledCheckedIndexes = _.intersection(checkedIndexes, disabledIndexes);
    let newCheckedIndexes = checkedIndexes.slice(0);
    if (checked) {
      if (foundIndex === -1) {
        newCheckedIndexes = [...disabledCheckedIndexes, index];
      }
    } else {
      if (foundIndex !== -1) {
        newCheckedIndexes = [...disabledCheckedIndexes, index];
      }
    }
    return _.uniq(newCheckedIndexes);
  }

  renderCheckbox(subChild, child, shouldChecked, shouldDisabled, index, subIndex) {
    let { behavior, checkboxAs, checkboxClass, checkedCheckboxClass, disabledCheckboxClass, checkOnCheckbox } =
      this.props || {};
    let { type } = child.props || {};
    let {
      as: innerCheckboxAs,
      className: innerClass,
      checkedClass: innerCheckedClass,
      disabledClass: innerDisabledClass,
    } = subChild.props || {};
    return cloneElement(subChild, {
      key: `checkbox-${index}-${subIndex}`,
      type,
      behavior,
      index,
      data: child.props.data,
      checked: shouldChecked,
      disabled: shouldDisabled,
      checkOnCheckbox,
      checkItem: this.checkItem,
      itemProps: child.props,
      containerProps: this.props,
      containerState: this.state,
      ...(innerCheckboxAs != undefined ? {} : { as: checkboxAs }),
      ...(innerClass != undefined ? {} : { className: checkboxClass }),
      ...(innerCheckedClass != undefined ? {} : { checkedClass: checkedCheckboxClass }),
      ...(innerDisabledClass != undefined ? {} : { disabledClass: disabledCheckboxClass }),
    });
  }

  renderContent(subChild, child, shouldChecked, shouldDisabled, index, subIndex) {
    let { behavior, contentAs, contentClass, checkedContentClass, disabledContentClass, checkOnContent } =
      this.props || {};
    let { type } = child.props || {};
    let {
      as: innerContentAs,
      className: innerClass,
      checkedClass: innerCheckedClass,
      disabledClass: innerDisabledClass,
    } = subChild.props || {};
    return cloneElement(subChild, {
      key: `content-${index}-${subIndex}`,
      type,
      behavior,
      index,
      data: child.props.data,
      checked: shouldChecked,
      disabled: shouldDisabled,
      checkOnContent,
      checkItem: this.checkItem,
      itemProps: child.props,
      containerProps: this.props,
      containerState: this.state,
      ...(innerContentAs != undefined ? {} : { as: contentAs }),
      ...(innerClass != undefined ? {} : { className: contentClass }),
      ...(innerCheckedClass != undefined ? {} : { checkedClass: checkedContentClass }),
      ...(innerDisabledClass != undefined ? {} : { disabledClass: disabledContentClass }),
    });
  }

  renderItem(child, index) {
    let { behavior, itemAs, itemClass, checkedItemClass, disabledItemClass, checkOnItem } = this.props;
    let {
      as: innerItemAs,
      className: innerItemClass,
      checkedClass: innerCheckedClass,
      disabledClass: innerDisabledClass,
    } = child.props || {};
    let shouldChecked = this.isShouldCheckedItem(index);
    let shouldDisabled = this.isShouldDisabledItem(index);
    return cloneElement(child, {
      key: `item-${index}`,
      behavior,
      index,
      checked: shouldChecked,
      disabled: shouldDisabled,
      checkOnItem,
      checkItem: this.checkItem,
      children: Children.map(child.props.children, (subChild, subIndex) => {
        if (this.isValidItemCheckbox(subChild)) {
          return this.renderCheckbox(subChild, child, shouldChecked, shouldDisabled, index, subIndex);
        }
        if (this.isValidItemContent(subChild)) {
          return this.renderContent(subChild, child, shouldChecked, shouldDisabled, index, subIndex);
        }
        return null;
      }),
      ...(innerItemAs != undefined ? {} : { as: itemAs }),
      ...(innerItemClass != undefined ? {} : { className: itemClass }),
      ...(innerCheckedClass != undefined ? {} : { checkedClass: checkedItemClass }),
      ...(innerDisabledClass != undefined ? {} : { disabledClass: disabledItemClass }),
    });
  }

  render() {
    let { containerAs, children } = this.props;
    return (
      <Container as={containerAs} {...this.getRestProps()}>
        {Children.map(children, (child, index) => {
          if (this.isValidItem(child)) {
            return this.renderItem(child, index);
          }
          return child;
        })}
      </Container>
    );
  }
}

export { CheckableListGroup, CheckableListItem, Container, Checkbox, Content };
