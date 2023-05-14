import { GLOBALTYPES } from "../actionType";

const initialState = {
  conversations: [],
  currentConversation: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.CREATE_CONVERSATION:
      var conversationData = action.payload;
      var had = state.conversations.find(
        (item) =>
          item.customerId === conversationData.customerId &&
          item.userId === conversationData.userId
      );

      if (had) {
        return state;
      } else {
        return {
          ...state,
          conversations:
            state.conversations.length > 0
              ? [{...conversationData,messages:[]}, ...state.conversations,]
              : [{...conversationData,messages:[]}],
        };
      }
    case GLOBALTYPES.RECEIVE_MESSAGE:
      var messages = action.payload;
      var conver = state.conversations.find(
        (item) =>
          item.customerId === messages.customerId &&
          item.userId === messages.userId
      );
      
      conver.messages = [...conver.messages,messages];
      return {
        ...state,
        conversations: state.conversations.map((item) =>
          item.userId === messages.userId &&
          item.customerId === messages.customerId
            ? conver
            : item
        ),
      };
    case GLOBALTYPES.CHANGE_CONVERSATION:
      return {
        ...state,
        currentConversation: state.conversations.find(
          (item) =>
            item.userId === action.payload.userId &&
            item.customerId === action.payload.customerId
        )
      };
    default:
      return state;
  }
};
