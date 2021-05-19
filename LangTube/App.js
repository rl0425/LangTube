import React from "react";
import { StyleSheet } from "react-native";

/** 모듈 */
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";

/** 컴포넌트 */
import persist from "./source/config/store";
import Main from "./source/Main";


const persistStore = persist();

export default class App extends React.Component {
  render() {
    return (
      /** redux store에 접근을 가능하게 해주는 컴포넌트 */
      <Provider store={persistStore.store}>
        <PersistGate loading={null} persistor={persistStore.persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }

}

/** 스타일 */
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
