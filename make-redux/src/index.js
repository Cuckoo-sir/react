  function stateChanger (state, action) {
    if (!state) {
      return {
        title: {
          text: 'React.js 小书',
          color: 'red',
        },
        content: {
          text: 'React.js 小书内容',
          color: 'blue'
        }
      }
    }
    switch (action.type) {
      case 'UPDATE_TITLE_TEXT':
        return {
          ...state,
          title: {
            ...state.title,
            text: action.text
          }
        }
      case 'UPDATE_TITLE_COLOR':
        return {
          ...state,
          title: {
            ...state.title,
            color: action.color
          }
        }
      default:
        return false
    }
  }
  
  function renderApp (newAppState, oldAppStore = {}) { // 防止 oldAppState 没有传
    if(newAppState === oldAppStore) return // 数据没有变化就不渲染了
    console.log('render app...')
    renderTitle(newAppState.title, oldAppStore.title)
    renderContent(newAppState.content, oldAppStore.content)
  }
  
  function renderTitle (newTitle, oldTitle = {}) {
    if (newTitle === oldTitle) return // 数据没有变化就不渲染了
    console.log('render title...')
    const titleDOM = document.getElementById('title')
    titleDOM.innerHTML = newTitle.text
    titleDOM.style.color = newTitle.color
  }
  
  function renderContent (newContent, oldContent = {}) {
    if(newContent === oldContent) return // 数据没有变化就不渲染了
    console.log('render content...')
    const contentDOM = document.getElementById('content')
    contentDOM.innerHTML = newContent.text
    contentDOM.style.color = newContent.color
  }

  function createStore(reducer) {
    let state = null;
    const listeners = [];
    const subscribe = (listener) => listeners.push(listener);

    const getState = () => state; // 返回数据
    const dispatch = (action) => {
      state = reducer(state, action); // 覆盖原对象
      listeners.forEach((listener) => listener());
    }; // 修改状态
    dispatch({}) // 初始化state
    return {getState, dispatch, subscribe}
  }

  const store = createStore(stateChanger);
  let oldState = store.getState(); // 缓存旧的状态
  store.subscribe(() => {
    const newState = store.getState();
    renderApp(newState, oldState);
    oldState = newState;  // 渲染完以后，新的 newState 变成了旧的 oldState，等待下一次数据变化重新渲染
  }); // 监听数据变化

  renderApp(store.getState()); // 首次渲染
  store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题内容
  store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'green' });