export const initialStateUser = null;

const userReducer = (_, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;

    case "REMOVE_USER":
      return null;

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export default userReducer;
