import { checklistFields } from './queries';

export const commonVariables = `
  $contentType: String,
  $contentTypeId: String,
  $title: String
`;

export const commonParams = `
  contentType: $contentType,
  contentTypeId: $contentTypeId,
  title: $title
`;

const checklistsAdd = `
  mutation checklistsAdd(
    ${commonVariables}
  ) {
    checklistsAdd(
      ${commonParams}
    ) {
      ${checklistFields}
    }
  }
`;

const checklistsEdit = `
  mutation checklistsEdit(
    $_id: String!,
    ${commonVariables}
  ) {
    checklistsEdit(
      _id: $_id,
      ${commonParams}
    ) {
      ${checklistFields}
    }
  }
`;

const checklistsRemove = `
  mutation checklistsRemove($_id: String!) {
    checklistsRemove(_id: $_id) {
      _id
    }
  }
`;

// checklist items

const commonItemVariables = `
  $checklistId: String,
  $isChecked: Boolean,
  $content: String,
  $mentionedUserIds: [String],
  $order: Int
`;

const commonItemParams = `
  checklistId: $checklistId,
  isChecked: $isChecked,
  content: $content,
  mentionedUserIds: $mentionedUserIds,
  order: $order
`;

const checklistItemsAdd = `
  mutation checklistItemsAdd(
    ${commonItemVariables}
  ) {
    checklistItemsAdd(
      ${commonItemParams}
    ) {
      _id
      isChecked
      content
    }
  }
`;

const checklistItemsEdit = `
  mutation checklistItemsEdit(
    $_id: String!,
    ${commonItemVariables}
  ) {
    checklistItemsEdit(
      _id: $_id,
      ${commonItemParams}
    ) {
      _id
      isChecked
      content
    }
  }
`;

const updateOrderItems = `
  mutation updateOrderItems($orders: [OrderInput]) {
    updateOrderItems(orders: $orders) {
      _id
    }
  }
`;

const checklistItemsRemove = `
  mutation checklistItemsRemove($_id: String!) {
    checklistItemsRemove(_id: $_id) {
      _id
    }
  }
`;

export default {
  checklistsAdd,
  checklistsEdit,
  checklistsRemove,
  checklistItemsAdd,
  checklistItemsEdit,
  updateOrderItems,
  checklistItemsRemove
};
