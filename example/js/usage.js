import React from 'react';
import classnames from 'classnames';
import { CheckableListGroup, CheckableListItem } from '../../index';

function Usage1() {
  return (
    <CheckableListGroup
      className="filtrate_r_list checkbox_column"
      checkedItemClass="cur"
      checkboxClass="checkbox"
      checkOnItem={true}
      checkOnCheckbox={true}
      checkOnContent={true}
      onCheck={obj => {
        console.log(obj);
      }}
    >
      <CheckableListItem type="wildcard" defaultChecked={true} data={{ value: '*' }}>
        <CheckableListItem.Checkbox as="i" />
        <CheckableListItem.Content as="span">不限</CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem data={{ value: '00:00-06:00' }}>
        <CheckableListItem.Checkbox as="i" />
        <CheckableListItem.Content as="span">00:00-06:00</CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem data={{ value: '06:00-12:00' }}>
        <CheckableListItem.Checkbox as="i" />
        <CheckableListItem.Content as="span">06:00-12:00</CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem data={{ value: '12:00-18:00' }}>
        <CheckableListItem.Checkbox as="i" />
        <CheckableListItem.Content as="span">12:00-18:00</CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem data={{ value: '18:00-24:00' }}>
        <CheckableListItem.Checkbox as="i" />
        <CheckableListItem.Content as="span">18:00-24:00</CheckableListItem.Content>
      </CheckableListItem>
    </CheckableListGroup>
  );
}

function Usage2() {
  return (
    <CheckableListGroup
      className="text_select_list"
      contentAs="span"
      behavior="radio"
      checkedItemClass="cur"
      checkOnItem={true}
      checkOnContent={true}
      onCheck={obj => {
        console.log(obj);
      }}
    >
      <CheckableListItem type="wildcard" defaultChecked={true} data={{ id: 0, value: '*' }}>
        <CheckableListItem.Content>不限</CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem data={{ id: 1, value: '4.5' }}>
        <CheckableListItem.Content>4.5分以上</CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem data={{ id: 2, value: '4.0' }}>
        <CheckableListItem.Content>4.0分以上</CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem data={{ id: 3, value: '3.5' }}>
        <CheckableListItem.Content>3.5分以上</CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem data={{ id: 4, value: '3.0' }}>
        <CheckableListItem.Content>3.0分以上</CheckableListItem.Content>
      </CheckableListItem>
    </CheckableListGroup>
  );
}

const UsageInnerCheckbox = (index, props) => {
  let clsName = classnames({
    wildcard: props.type.toLowerCase() === 'wildcard',
    checked: props.checked,
    disabled: props.disabled,
  });
  return (
    <label className={clsName}>
      <input
        type={props.behavior.toLowerCase() === 'checkbox' ? 'checkbox' : 'radio'}
        checked={props.checked}
        disabled={props.disabled}
        onChange={() => {
          props.checkItem(index, !props.checked, props.type, props.behavior, props.data);
        }}
      />
    </label>
  );
};

const UsageInnerContent = content => (index, props) => {
  let clsName = classnames({
    wildcard: props.type.toLowerCase() === 'wildcard',
    checked: props.checked,
    disabled: props.disabled,
  });
  return <span className={clsName}>{content}</span>;
};

const UsageCheckboxAsSimple = content => ({ ...props }) => {
  return (
    <label className="checkbox-simple" {...props}>
      {content}
    </label>
  );
};

const UsageContentAsSimple = content => ({ ...props }) => {
  return (
    <span className="content-simple" {...props}>
      {content}
    </span>
  );
};

function Usage3() {
  return (
    <CheckableListGroup
      className="my-checkable-list"
      containerAs="ul"
      itemAs="li"
      checkboxAs={false}
      contentAs={false}
      behavior="checkbox"
      itemClass="my-checkable-item"
      checkedItemClass="checked-item"
      disabledItemClass="disabled-item"
      checkOnItem={true}
      checkOnCheckbox={true}
      checkOnContent={true}
      onBeforeCheck={() => {}}
      onCheck={obj => {
        console.log(obj);
      }}
    >
      <CheckableListItem type="wildcard">
        <CheckableListItem.Checkbox>{UsageInnerCheckbox}</CheckableListItem.Checkbox>
        <CheckableListItem.Content>{UsageInnerContent('不限')}</CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem>
        <CheckableListItem.Checkbox>{UsageInnerCheckbox}</CheckableListItem.Checkbox>
        <CheckableListItem.Content>{UsageInnerContent('Test 1')}</CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem>
        <CheckableListItem.Checkbox>{UsageInnerCheckbox}</CheckableListItem.Checkbox>
        <CheckableListItem.Content>{UsageInnerContent('Test 2')}</CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem defaultChecked={true} defaultDisabled={true}>
        <CheckableListItem.Checkbox>{UsageInnerCheckbox}</CheckableListItem.Checkbox>
        <CheckableListItem.Content>{UsageInnerContent('Test 3')}</CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem defaultChecked={false} defaultDisabled={true}>
        <CheckableListItem.Checkbox>{UsageInnerCheckbox}</CheckableListItem.Checkbox>
        <CheckableListItem.Content>{UsageInnerContent('Test 4')}</CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem defaultChecked={true} defaultDisabled={false}>
        <CheckableListItem.Checkbox>{UsageInnerCheckbox}</CheckableListItem.Checkbox>
        <CheckableListItem.Content>{UsageInnerContent('Test 5')}</CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem defaultChecked={false} defaultDisabled={false}>
        <CheckableListItem.Checkbox>{UsageInnerCheckbox}</CheckableListItem.Checkbox>
        <CheckableListItem.Content>{UsageInnerContent('Test 6')}</CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem defaultChecked={true}>
        <CheckableListItem.Checkbox>{UsageInnerCheckbox}</CheckableListItem.Checkbox>
        <CheckableListItem.Content>{UsageInnerContent('Test 7')}</CheckableListItem.Content>
      </CheckableListItem>
      Test for keeping1
      <div>Test for keeping2</div>
      <CheckableListItem>
        <CheckableListItem.Checkbox as={UsageCheckboxAsSimple(<label style={{ color: 'red' }}>*</label>)} />
        <CheckableListItem.Content as={UsageContentAsSimple(<label>Test 8</label>)} />
      </CheckableListItem>
      <CheckableListItem>
        <CheckableListItem.Checkbox as="span">{UsageInnerCheckbox}</CheckableListItem.Checkbox>
        <CheckableListItem.Content as="strong">{UsageInnerContent('Test 9')}</CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem defaultChecked={true}>
        <CheckableListItem.Checkbox>
          {(index, props) => <label style={{ fontWeight: props.checked ? 'bold' : 'normal' }}>10.</label>}
        </CheckableListItem.Checkbox>
        <CheckableListItem.Content>
          {(index, props) => <span style={{ color: props.checked ? 'red' : 'blue' }}>Test 10</span>}
        </CheckableListItem.Content>
      </CheckableListItem>
    </CheckableListGroup>
  );
}

function Usage4() {
  return (
    <CheckableListGroup
      className="my-checkable-list"
      containerAs="ul"
      itemAs="li"
      checkboxAs={false}
      contentAs={false}
      behavior="radio"
      itemClass="my-checkable-item"
      checkedItemClass="checked-item"
      disabledItemClass="disabled-item"
      checkOnItem={true}
      checkOnCheckbox={true}
      checkOnContent={true}
      onBeforeCheck={() => {}}
      onCheck={obj => {
        console.log(obj);
      }}
    >
      <CheckableListItem type="wildcard">
        <CheckableListItem.Checkbox>{UsageInnerCheckbox}</CheckableListItem.Checkbox>
        <CheckableListItem.Content>{UsageInnerContent('不限')}</CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem>
        <CheckableListItem.Checkbox>{UsageInnerCheckbox}</CheckableListItem.Checkbox>
        <CheckableListItem.Content>{UsageInnerContent('Test 1')}</CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem>
        <CheckableListItem.Checkbox>{UsageInnerCheckbox}</CheckableListItem.Checkbox>
        <CheckableListItem.Content>{UsageInnerContent('Test 2')}</CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem defaultChecked={true} defaultDisabled={true}>
        <CheckableListItem.Checkbox>{UsageInnerCheckbox}</CheckableListItem.Checkbox>
        <CheckableListItem.Content>{UsageInnerContent('Test 3')}</CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem defaultChecked={false} defaultDisabled={true}>
        <CheckableListItem.Checkbox>{UsageInnerCheckbox}</CheckableListItem.Checkbox>
        <CheckableListItem.Content>{UsageInnerContent('Test 4')}</CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem defaultChecked={true} defaultDisabled={false}>
        <CheckableListItem.Checkbox>{UsageInnerCheckbox}</CheckableListItem.Checkbox>
        <CheckableListItem.Content>{UsageInnerContent('Test 5')}</CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem defaultChecked={false} defaultDisabled={false}>
        <CheckableListItem.Checkbox>{UsageInnerCheckbox}</CheckableListItem.Checkbox>
        <CheckableListItem.Content>{UsageInnerContent('Test 6')}</CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem defaultChecked={true}>
        <CheckableListItem.Checkbox>{UsageInnerCheckbox}</CheckableListItem.Checkbox>
        <CheckableListItem.Content>{UsageInnerContent('Test 7')}</CheckableListItem.Content>
      </CheckableListItem>
      Test for keeping1
      <div>Test for keeping2</div>
      <CheckableListItem>
        <CheckableListItem.Checkbox as={UsageCheckboxAsSimple(<label style={{ color: 'red' }}>*</label>)} />
        <CheckableListItem.Content as={UsageContentAsSimple(<label>Test 8</label>)} />
      </CheckableListItem>
      <CheckableListItem>
        <CheckableListItem.Checkbox as="span">{UsageInnerCheckbox}</CheckableListItem.Checkbox>
        <CheckableListItem.Content as="strong">{UsageInnerContent('Test 9')}</CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem defaultChecked={true}>
        <CheckableListItem.Checkbox>
          {(index, props) => <label style={{ fontWeight: props.checked ? 'bold' : 'normal' }}>10.</label>}
        </CheckableListItem.Checkbox>
        <CheckableListItem.Content>
          {(index, props) => <span style={{ color: props.checked ? 'red' : 'blue' }}>Test 10</span>}
        </CheckableListItem.Content>
      </CheckableListItem>
    </CheckableListGroup>
  );
}

const UsageBareWildcardCheckbox = (index, props) => {
  let clsName = classnames({
    wildcard: props.type.toLowerCase() === 'wildcard',
    checked: props.checked,
    disabled: props.disabled,
  });
  return (
    <label className={clsName}>
      <input
        type="checkbox"
        checked={props.checked}
        disabled={props.disabled}
        onChange={() => {
          props.checkItem(index, !props.checked, props.type, props.behavior, props.data);
        }}
      />
    </label>
  );
};

const UsageBareContentWithSimple = content => (index, props) => {
  let clsName = classnames('bare-content-simple', {
    wildcard: props.type.toLowerCase() === 'wildcard',
    checked: props.checked,
    disabled: props.disabled,
  });
  return <label className={clsName}>{content}</label>;
};

const UsageCheckboxWithSimple = content => ({ ...props }) => {
  return (
    <span className="checkbox-simple" {...props}>
      {content}
    </span>
  );
};

const UsageContentWithSimple = content => ({ ...props }) => {
  return (
    <span className="content-simple" {...props}>
      {content}
    </span>
  );
};

function Usage5() {
  return (
    <CheckableListGroup
      className="checkable-list-group"
      containerAs="ul"
      itemAs="li"
      checkboxAs={false}
      contentAs={false}
      behavior="checkbox"
      itemClass="checkable-list-item"
      checkedItemClass="checked"
      disabledItemClass="disabled"
      checkOnItem={true}
      checkOnCheckbox={true}
      checkOnContent={true}
      onBeforeCheck={() => {}}
      onCheck={() => {}}
    >
      <CheckableListItem
        as="div"
        type="wildcard"
        defaultChecked={true}
        defaultDisabled={false}
        style={{ color: 'red' }}
      >
        <CheckableListItem.Checkbox as="">{UsageBareWildcardCheckbox}</CheckableListItem.Checkbox>
        <CheckableListItem.Content as="">{UsageBareContentWithSimple('Test 0')}</CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem as="li" type="normal" defaultChecked={true} defaultDisabled={false}>
        <CheckableListItem.Content as={UsageContentWithSimple(<label>Test 1</label>)} />
        <CheckableListItem.Checkbox as={UsageCheckboxWithSimple('✅')} style={{ color: 'blue' }} />
      </CheckableListItem>
      <CheckableListItem as="li" defaultChecked={true} defaultDisabled={true}>
        <CheckableListItem.Checkbox as={UsageCheckboxWithSimple('✅')} style={{ color: 'blue' }} />
        <CheckableListItem.Content as="span">
          <label>Test 2</label>
        </CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem as="li" defaultChecked={false} defaultDisabled={true}>
        <CheckableListItem.Content>
          <div>Test 3</div>
        </CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem as="li">
        <CheckableListItem.Content>
          <div>Test 4</div>
        </CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem as="">
        <CheckableListItem.Checkbox as={false} />
        <CheckableListItem.Content>
          <div>Test 5</div>
        </CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem>
        <CheckableListItem.Checkbox as={false}>
          <label>SIX:</label>
        </CheckableListItem.Checkbox>
        <CheckableListItem.Content as={false}>
          <span>Test 6</span>
        </CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem defaultChecked={false} defaultDisabled={true}>
        <CheckableListItem.Checkbox as={false}>
          <label>SEVEN:</label>
        </CheckableListItem.Checkbox>
        <CheckableListItem.Content>
          <span>Test 7</span>
        </CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem as="div" defaultChecked={true}>
        <CheckableListItem.Checkbox as={true}>
          <label>EIGHT:</label>
        </CheckableListItem.Checkbox>
        <CheckableListItem.Content>
          <label>Test 8</label>
        </CheckableListItem.Content>
      </CheckableListItem>
      <CheckableListItem as="li" />
      <div>Test for keeping1</div>
      <div>Test for keeping2</div>
      <CheckableListItem as="li">
        <CheckableListItem.Checkbox>
          {(index, props) => <span style={props.disabled ? { color: 'gray' } : null}>Test 9</span>}
        </CheckableListItem.Checkbox>
      </CheckableListItem>
      <CheckableListItem>
        <CheckableListItem.Content>
          {(index, props) => <span style={props.checked ? { color: 'red' } : null}>Test 10</span>}
        </CheckableListItem.Content>
      </CheckableListItem>
    </CheckableListGroup>
  );
}

export { Usage1, Usage2, Usage3, Usage4, Usage5 };
