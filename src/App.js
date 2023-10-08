// Pet component
const Pet = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("h1", {}, props.animal),
    React.createElement("h1", {}, props.breed),
  ]);
};

// App coponent

const App = () => {
  return React.createElement(
    "div",
    {}, // styles, id, class can be placed he. => <div id="container">
    [
      React.createElement("h1", {}, "Adopt Me!"), // creating an h1 in the div
      React.createElement(Pet, {
        name: "Luna",
        animal: "Dog",
        breed: "German Sheperd",
      }),
      React.createElement(Pet, { name: "Loki", animal: "Cat", breed: "" }),
      React.createElement(Pet, {
        name: "flashy",
        animal: "fish",
        breed: "Cat fish",
      }),
    ]
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
