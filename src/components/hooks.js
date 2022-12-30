import React, { forwardRef, useContext, useImperativeHandle, useReducer, useRef, useState } from 'react';
import { useEffect } from 'react';

//--------------------------------------------------------Hooks---------------------------------------
// Both Components & Hooks are functions only
// Hooks are a new addition in React 16.8. They let you use state,life cycle methods and other React features without writing a class.
// when upgrading - update all packages, ReactDOM & React Native also supports
// 100% backwards-compatible. Hooks don’t contain any breaking changes.
// There are no plans to remove classes from React.
// Disadvantages of classbased :
// 1) It’s hard to reuse stateful logic between components in class -> 
//           ->normally we share using render props and higher-order comp , but needs restructure your component & harder to follow
//           -> can surronded by many layers in dev tools in normal above approch
//   sol: Hooks allow you to reuse stateful logic without changing your component hierarchy.
//2) Complex components become hard to understand ->
//           -> unmanageable mess of stateful logic and side effects.
//   sol: Hooks let you split one component into smaller functions based on what pieces are related (such as setting up a subscription or fetching data).
//3) Classes confuse both people and machines ->
//           -> classes don’t minify very well, and they make hot reloading flaky and unreliable
//           -> this keyword very different from how it works in most languages

// Gradual Adoption Strategy :
//  -> Hooks work side-by-side with existing code so you can adopt them gradually.

//----------------------------------------------------Hooks at a Glance--------------------------------------------

//----------------------------------------------------state hook: 
// We call it inside a function component to add some local state to it. React will preserve this state between re-renders.
// Returns a pair: the current state value and a function that lets you update it.
// array destructuring[] lets us give different names to the state variables we declared by calling useState

// function Example() {
//   // Declare a new state variable, which we'll call "count"
//   const [count, setCount] = useState(0);  
  
//   return (
//     <>
//       <p>You clicked {count} times</p>
//       <button onClick={() => setCount(count + 1)}>
//         Click me
//       </button>
//     </>
//   );
// }
// export {Example}

//--------------------------------------------------------multiple states

// function ExampleWithManyStates() {
//   // Declare multiple state variables!
//   const [age, setAge] = useState(42);
//   const [fruit, setFruit] = useState('banana');
//   // const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
//   // ...

//   return (
//     <div>
//       <p>{age}</p>
//       <button onClick={() => setAge(50)}>set Age 50</button>
//       <p>{fruit}</p>
//       <button onClick={() => setFruit('apple')}>set Fruit apple</button>
//       {/* <p>{todos}</p> */}
//       {/* <button onClick={() => setTodos([{ text: 'Learn More Hooks ' }])}>set Todos</button> */}
//     </div>
//   );
// }

//export {ExampleWithManyStates}

//---------------------------------------Effect Hook:
// side effects: data fetching, subscriptions, or manually changing the DOM(can affect other comp & can’t be done during rendering)
// useEffect() = componentDidMount, componentDidUpdate, and componentWillUnmount in class comp
// React to run your “effect” function after flushing changes to the DOM
// don’t block the browser from updating the screen(not synchronosuly for all the effects)
// In class based Lifecycle methods force us to split this logic even though conceptually code in both of them is -related to the same effect
// componentDidUpdate(prevProps,prevState){}   -> has prev props & states

// function Example() {
//   const [count, setCount] = useState(0);
//   // Similar to componentDidMount and componentDidUpdate:
//   useEffect(() => {
//     // Update the document title using the browser API
//     document.title = `You clicked ${count} times`;
//   });

//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={() => setCount(count + 1)}>
//         Click me
//       </button>
//     </div>
//   );
// }
// export {Example}

//------------------- explanation - optional cleanup effect----

// using ChatAPI module that subscribe to friend's status
//Effects may also optionally specify how to “clean up” after them by returning a function

// useEffect(() => {                       
//   ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);                     // componentDidMount() &  componentDidUpdate()
//   return () => {  
//     ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);               // componentWillUnMount()
//   };
// });

//-------------------explantion- Multiple effects

// Just like with useState, you can use more than a single effect in a component:( separating unrelated logic into different effects)
// Hooks let us split the code based on what it is doing rather than a lifecycle method name.

// function FriendStatusWithCounter(props) {
  
//     const [count, setCount] = useState(0);
//     useEffect(() => {
//         document.title = `You clicked ${count} times`;
//     });

//     const [isOnline, setIsOnline] = useState(null);
//     useEffect(() => {
//         ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
//         return () => {
//         ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
//         };
//     });
// })

//-----------------Notes & Optmizing Performance by Skipping Effects------------------

// componentDidUpdate(prevProps, prevState) {                               // classbased
//  if (prevState.count !== this.state.count) {
//    document.title = `You clicked ${this.state.count} times`;
//  }
// }

// useEffect(() => {                                                       // usinghooks
//     document.title = `You clicked ${count} times`;
//  }, [count]); // Only re-run the effect if count changes

// In componentDidUpdate() cleanup & remove prev details & apply next effect has below , but in hooks useEffect works by default
//ChatAPI.unsubscribeFromFriendStatus(100, handleStatusChange); // Clean up previous effect
//ChatAPI.subscribeToFriendStatus(200, handleStatusChange);     // Run next effect

//---------------------------------------Rules of Hooks:

// -> call Hooks at the top level. Don’t call Hooks inside loops, conditions, or nested functions.
// -> call Hooks from React comp or custom hooks but not from normal js func().

// ESLint Plugin -> that enforces above two rules
// npm install eslint-plugin-react-hooks --save-dev
// This plugin is included by default in Create React App.

// how does React know which state corresponds to which useState call? -> React relies on the order in which Hooks are called.


//--------------------------------Building Your Own Hooks - reusing statefull logic b/w comp

// Building your own Hooks lets you extract component logic into reusable functions.
// A custom Hook is a JavaScript function whose name starts with ”use” and that may call other Hooks
// Most popular ways to share stateful logic b/w comp is -> "render props" and "higher-order" components,now will see with hooks

//---------- Extracting Custom Hook:

// function useFriendStatus(friendID) { 
//      const [isOnline, setIsOnline] = useState(null);
//      useEffect(() =>)
//       ...
//       return isOnline  
// }

// //-------------Using Custom Hook:                 // using above logic in below 2 diff components

// function FriendStatus(props) {
//     const isOnline = useFriendStatus(props.friend.id);
//     ...
// }

// function FriendListItem(props) {
//     const isOnline = useFriendStatus(props.friend.id);
//     ...
// }

//---------------Other Hooks related to sharing logic ---> useContext() & useReducer() :

// for resusing the stateful logic between components

//---------------------------------------------Hooks API Reference -----------------------------------------
// Basic Hooks: -------------

// ----------------useState-----------############:

// updating current state with prevCount values below example

// function Counter({initialCount}) {
//     const [count, setCount] = useState(initialCount);
//     return (
//       <>
//         Count: {count}
//         <button onClick={() => setCount(initialCount)}>Reset</button>
//         <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
//         <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
//       </>
//     );
//   }
// export {Counter}

// setCount() does not automatically merge updated objects(actually it replaces), so use spread operator to merge old state value with new
// ------------explanation 

// const [state, setState] = useState({ fName: "", lName: "" });

// setState(prevState => ({                                     // Object.assign would also work
//   ...prevState,
//   fName: 'your updated value here'
// }));


// ----------Lazy initial state
//if the initial state is the result of an expensive computation, you may provide a function instead,

// const [state, setState] = useState(() => {
//     const initialState = someExpensiveComputation(props);
//     return initialState;
//   });

// function someExpensiveComputation(){
//   ...
// }

//----------Batching of state updates
// React may group several state updates into a single re-render to improve performance(Starting React 18, batching is enabled for all updates by default)
// Before React 18,only updates inside React event handlers were batched
// Batching(from react 18) - update states & effects asynchronously, to update synchronously wrap it in flushSync.

//---------------------------ex (Before React18)

// handleChangeInput(){           // change event handler attached to button -> states are grouped for single update/render
//   setFName("rama")
//   setPlace("Hyd");
// }

// function demo(){              // normal js function  -  states are not grouped they update individually rerender's
//   setFName("rama");
//   setPlace("Hyd");
// }

// ----------------useEffect-----------############:

// By default, effects run after every completed render, but you can choose to fire them only when certain values have changed.
// Mutations, subscriptions, timers, logging, and other side effects are not allowed doing directly inside body , so we use useEffect.

//---Cleaning up an effect explantion

// useEffect(() => {
//     const subscription = props.source.subscribe();
//     return () => {
//       // Clean up the subscription
//       subscription.unsubscribe();
//     };
//   });

// The clean-up function runs before the component is removed from the UI to prevent memory leaks.
// -the function passed to useEffect fires after layout and paint, during a deferred event. so suitable for sideeffects, subscriptions, timeouts, eventhandlers.
// However, not all effects can be deferred.For example, a DOM mutation that is visible to the user must fire synchronously before the next paint so that the user does not perceive a visual inconsistency.
// React provides one additional Hook called "useLayoutEffect".

// useEffect        -> updates scheduled inside these effects are still deferred
// useLayoutEffect  -> fires the function and processes the updates inside of it immediately.

//------Conditionally firing an effect
// We don’t need to create a new subscription on every update, only if the source prop has changed.

// useEffect(() => {
//       const subscription = props.source.subscribe();
//       return () => {
//         subscription.unsubscribe();
//       };
//     },
//     [props.source],
//   );

//----IMP:::
//- If you use this optimization, make sure the array includes all values from the component scope (such as props and state) 
//-that change over time and that are used by the effect.


// ---------------  exhaustive-deps rule as part of our eslint-plugin-react-hooks
//  It warns when dependencies are specified incorrectly to useEffect and suggests a fix

//-------------------useContext-----------############:(sharing logic)

// const value = useContext(MyContext);

// useContext() accepts a context object (the current latest value returned from React.createContext, value prop of the nearest <MyContext.Provider>.
// Even if an ancestor uses React.memo or shouldComponentUpdate, a rerender will still happen starting at the component itself using useContext.
// useContext(MyContext) only lets you read the context and subscribe to its changes. You still need a <MyContext.Provider> 
// -above in the tree to provide the value for this context.

// ---------------------ex
// const themes = {
//     light: {
//       foreground: "#000000",
//       background: "#eeeeee"
//     },
//     dark: {
//       foreground: "#ffffff",
//       background: "#222222"
//     }
//   };
  
//   const ThemeContext = React.createContext(themes.light);
  
//   export function Parent() {
//     return (
//       <ThemeContext.Provider value={themes.dark}>
//         <Child1 />
//       </ThemeContext.Provider>
//     );
//   }
  
//   function Child1(props) {
//     return (
//       <div>
//         <Child2 />
//       </div>
//     );
//   }
  
//   function Child2() {
//     const theme = useContext(ThemeContext);
//     return (
//       <button style={{ background: theme.background, color: theme.foreground, marginTop:100 }}>
//         I am styled by theme context!
//       </button>
//     );
//   }

//----------------------------------------------------Additional Hooks------------------------------------------------------

//----------------------useReducer-----------############:

//const [state, dispatch] = useReducer(reducer, initialArg, init);

// useReducer is usually preferable to useState when you have complex state logic that involves multiple sub-values 
//optimize performance for components that trigger deep updates because you can pass dispatch down instead of callbacks.

//-----------------------Counter update using useReducer(): 
// Redux = action -> reducer -> state

// const initialState = {count: 0};

// function reducer(state, action) {
//   switch (action.type) {
//     case 'increment':
//       return {count: state.count + 1};
//     case 'decrement':
//       return {count: state.count - 1};
//     default:
//       throw new Error();
//   }
// }


// export function Counter() {
//   // const [name, setName] = useState("");
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return (
//     <>
//       Count: {state.count}
//       <button onClick={() => dispatch({type: 'decrement'})}>-</button>
//       <button onClick={() => dispatch({type: 'increment'})}>+</button>
//     </>
//   );
// }

//----------------------------Normal counter using useState():

// function Counter({initialCount = 0}) {
//     const [count, setCount] = useState(initialCount);
//     return (
//       <>
//         Count: {count}
//         <button onClick={() => setCount(initialCount)}>Reset</button>
//         <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
//         <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
//       </>
//     );
//   }
// export {Counter}

// React guarantees that dispatch function identity is stable and won’t change on re-renders. 
// -This is why it’s safe to omit from the useEffect or useCallback dependency list.

//---------------Specifying the initial state

//  simplest way is to pass the initial state as a second argument:
//const [state, dispatch] = useReducer(reducer,{count: initialCount});


//---------------Lazy initialization -(counter intial value by user while callin hook)
//  extract the logic for calculating the initial state outside the reducer & handy for resetting the state later in response to an action:
//  The initial state will be set to init(initialArg).
//  The initial value sometimes needs to depend on props and so is specified from the Hook call instead(App.js). 
//  -see App.js -> <Counter initialCount={0} />

// function init(initialCount) {
//     return {count: initialCount};
//   }
  
//   function reducer(state, action) {
//     switch (action.type) {
//       case 'increment':
//         return {count: state.count + 1};
//       case 'decrement':
//         return {count: state.count - 1};
//       case 'reset':
//         return init(action.payload);
//       default:
//         throw new Error();
//     }
//   }
  
//   export function Counter({initialCount}) {
//     const [state, dispatch] = useReducer(reducer, initialCount, init);
//     return (
//       <>
//         Count: {state.count}
//         <button
//           onClick={() => dispatch({type: 'reset', payload: initialCount})}>
//           Reset
//         </button>
//         <button onClick={() => dispatch({type: 'decrement'})}>-</button>
//         <button onClick={() => dispatch({type: 'increment'})}>+</button>
//       </>
//     );
//   }
  
//-----------Bailing out of a dispatch
//If you return the same value from a Reducer Hook as the current state, 
// -React will bail out(not rerender child)without rendering the children or firing effect(Object.is algorithm)
// If you’re doing expensive calculations while rendering, you can optimize them with useMemo().

// Some time the expensive calcualtion calculated everytime & child component unneccessarily rerenders due to other changes in parent comp
// -- do to avoid that we use useCallback & useMemo

//--------------------useCallback-----------############:
// Returns a memoized callback, Pass an inline callback and an array of dependencies

// const memoizedCallback = useCallback(() => {
//       doSomething(a, b);
//    },[a, b],
//  );

//  useful when passing callbacks to optimized child comp that rely on reference equality to prevent unnecessary renders (e.g shouldComponentUpdate).

//------------------------useMemo----------------############:
// Returns a memoized value

// const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// usefull ,This optimization helps to avoid expensive calculations on every render.
// side effects belong in useEffect, not useMemo.

// ----------use exhaustive-deps rule as part of our eslint-plugin-react-hooks 
// It warns when dependencies are specified incorrectly and suggests a fix.

//-----------------------useRef-----------------##############:
// useRef returns a mutable ref object whose .current property is initialized to the passed argument (initialValue).
//- The returned object will persist for the full lifetime of the component.

//const refContainer = useRef(initialValue);

//---------ex
// export function TextInputWithFocusButton() {
//     const inputEl = useRef(null);
//     const onButtonClick = () => {
//       // `current` points to the mounted text input element
//       inputEl.current.focus();
//     };
//     return (
//       <>
//         <input ref={inputEl} type="text" />
//         <button onClick={onButtonClick}>Focus the input</button>
//       </>
//     );
//   }

  // used to access child dom &  hold a mutable value in its .current property. will give you the same ref object on every render.
  // useRef doesn’t notify you when its content changes & .current property doesn’t cause a re-render.

//--------------------ex , explanation
// The useRef() Hook isn’t just for DOM refs as above & also can use for clear intervals as below
// useRef() is like instance variable,generic container whose property is mutable and can hold any value

// function Timer() {
//     const intervalRef = useRef();

//     useEffect(() => {
//       const id = setInterval(() => {
//         // ...
//       });
//       intervalRef.current = id;
//       return () => {
//         clearInterval(intervalRef.current);
//       };
//     });
  
//     // ...
//     // ...
//   function handleCancelClick() {
//     clearInterval(intervalRef.current);
//   }
//   // ...
//   }

// to set we dont need ref but its useful if we want to clear the interval from an event handler:
// Instead, typically you want to modify refs in event handlers and effects.

//------------------------useImperativeHandle-----------------##############:

// useImperativeHandle customizes the instance value that is exposed to parent components when using ref.
// Create state in child that need to be updated via in parent comp without rerendering parent comp see below .
// - open console it's upating count of child from parent button & also rerendering parent comp, so need to stop parent rerender

//----------without useImperative

// const Child = ({count}) =>{
//     const[childCount, setChildCount] = useState(0);

//     useEffect(() => {
//         setChildCount(count);
//     },[count]);

//     return <div><p>{childCount}</p></div>
// }
// export {Child}

// const Parent = () =>{
//     const[count, setCount] = useState(0);

//     const updateCount = () => {
//         setCount(count + 1);
//     }
//     useEffect(()=>{
//         console.log("Parent render again")
//     });
//     return <div>
//         <Child count={count}/>
//         <button type='button' onClick={updateCount}>Increase Count</button>
//     </div>
// }
// export {Parent}

//----------useImperative to stop parent rerendering

// const Child = ({count},ref) =>{
//     const[childCount, setChildCount] = useState(0);

//     useImperativeHandle(ref, () => ({                                      // updating the child state without any rerendering of parent comp
//         increaseCount: () => setChildCount(childCount + 1)                 // method which will enhance/increment th count
//     }));

//     return <div><p>{childCount}</p></div>
// }
// export {forwardRef(Child) }                                                 // need to add forwardRef for child comp

// const Parent = () =>{                                                      
//     const[count, setCount] = useState(0);
//     const childRef = useRef(null);                                         // in parent create reference for child

//     const updateCount = () => {
//         childRef.current.increaseCount();
//         //setCount(count + 1);                                             // so parent will not rerender because we are not using setCount to update state
//     }
//     useEffect(()=>{
//         console.log("Parent render again")
//     });
//     return <div>
//         <Child count={count} ref={childRef} />
//         <button type='button' onClick={updateCount}>Increase Count</button>
//     </div>
// }
// export {Parent}

//------------------------useLayoutEffect-----------------##############:
// identical to useEffect, but it fires synchronously after all DOM mutations. Use this to read layout from the DOM & synchronously re-render. 

// Prefer the standard useEffect when possible to avoid blocking visual updates.
// useLayoutEffect fires in the same phase as componentDidMount and componentDidUpdate

//------------------------useDebugValue-----------------###############:
// useDebugValue(value)
// useDebugValue can be used to display a label for custom hooks in React DevTool // same like console.log but we use in react dev tool

//----------------------useDeferredValue-----------------###############:
// const deferredValue = useDeferredValue(value);
// useDeferredValue only defers the value that you pass to it.
// The benefits to using useDeferredValue is that React will work on the update as soon as other work finishes 
//-(instead of waiting for an arbitrary amount of time),

//-----------------------useTransition-------------------################:
// const [isPending, startTransition] = useTransition();


//------------------------useId--------------------------################:
// const id = useId(); 
// useId is a hook for generating unique IDs that are stable across the server and client not for generating keys in a list.
// useId includes the : token. so its unique , but is not supported in CSS selectors or APIs like querySelectorAll.
// --------ex - explan
// function Checkbox() {
//     const id = useId();
//     return (
//       <>
//         <label htmlFor={id}>Do you like React?</label>
//         <input id={id} type="checkbox" name="react"/>
//       </>
//     );
//   };

//-----------------------------------------------------------Library Hooks---------------------------------------------------------

// integrate libraries deeply into the React model, and are not typically used in application code.

//-------------------useSyncExternalStore-------------------################:

// const state = useSyncExternalStore(subscribe, getSnapshot[, getServerSnapshot]);
// useSyncExternalStore is a hook recommended for reading and subscribing from external data sources in a way that’s compatible
//-with concurrent rendering features like selective hydration and time slicing.

//------------------useInsertionEffect---------------------#################:
// identical to useEffect,but it fires synchronously before all DOM mutations.
// Use this to inject styles into the DOM before reading layout in useLayoutEffect