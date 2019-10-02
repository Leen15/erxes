import { AddContainer } from 'modules/boards/styles/item';
import Button from 'modules/common/components/Button';
import { getMentionedUserIds } from 'modules/common/components/EditorCK';
import { FormControl } from 'modules/common/components/form';
import Icon from 'modules/common/components/Icon';
import React from 'react';
import xss from 'xss';
import { IChecklistItem } from '../types';

type Props = {
  item: IChecklistItem;
  editItem: (doc: IChecklistItem, callback: () => void) => void;
  removeItem: (checklistItemId: string, callback: () => void) => void;
  setChecklistState: (diffComplete, diffAll) => void;
};

type State = {
  isEditing: boolean;
  content: string;
  disabled: boolean;
  isChecked: boolean;
};

class ChecklistItem extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      content: props.item.content,
      disabled: false,
      isChecked: props.item.isChecked
    };
  }

  renderContent = () => {
    const { removeItem, item, setChecklistState } = this.props;
    const { isEditing, content, isChecked } = this.state;

    if (isEditing) {
      return null;
    }

    const onClick = () => {
      this.setState({ isEditing: true });
    };

    const removeClick = () => {
      removeItem(item._id, () => {
        setChecklistState(isChecked ? -1 : 0, -1);
      });
    };

    return (
      <>
        <label
          onClick={onClick}
          dangerouslySetInnerHTML={{ __html: xss(content) }}
        />
        <Button btnStyle="simple" onClick={removeClick}>
          <Icon icon="cancel-1" />
        </Button>
      </>
    );
  };

  renderInput = () => {
    const { isEditing, content } = this.state;

    if (!isEditing) {
      return null;
    }

    const onChangeContent = e => {
      this.setState({
        content: (e.currentTarget as HTMLInputElement).value
      });
    };

    const isEditingChange = () => this.setState({ isEditing: false });

    const onSubmit = e => {
      e.preventDefault();
      const { editItem, item } = this.props;

      // before save, disable save button
      this.setState({ disabled: true });

      const mentionedUserIds = getMentionedUserIds(content);

      const doc = {
        _id: item._id,
        checklistId: item.checklistId,
        content,
        isChecked: item.isChecked,
        mentionedUserIds,
        order: item.order
      };

      editItem(doc, () => {
        // after save, enable save button
        this.setState({ disabled: false });

        isEditingChange();
      });
    };

    return (
      <AddContainer onSubmit={onSubmit}>
        <FormControl
          autoFocus={true}
          onChange={onChangeContent}
          value={this.state.content}
        />
        <Button btnStyle="simple" onClick={isEditingChange}>
          <Icon icon="cancel" />
        </Button>

        <Button
          disabled={this.state.disabled}
          btnStyle="success"
          icon="checked-1"
          type="submit"
        >
          Save
        </Button>
      </AddContainer>
    );
  };

  onCheckChange = e => {
    const { editItem, item, setChecklistState } = this.props;

    const checked = (e.currentTarget as HTMLInputElement).checked;

    const doc = {
      _id: item._id,
      checklistId: item.checklistId,
      content: item.content,
      isChecked: checked,
      order: item.order
    };

    editItem(doc, () => {
      this.setState({ isChecked: checked });
      setChecklistState(checked ? 1 : -1, 0);
    });
  };

  render = () => {
    const { isChecked } = this.state;

    return (
      <>
        <FormControl
          componentClass="checkbox"
          checked={isChecked}
          onChange={this.onCheckChange}
        />
        {this.renderContent()}
        {this.renderInput()}
      </>
    );
  };
}

export default ChecklistItem;
