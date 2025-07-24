const BackEnd = () => {
  const connectBackend = () => {
    fetch("localhost:3000/")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then((err) => console.log(err));
  };

  return (
    <>
      <button onClick={connectBackend}></button>
    </>
  );
};

export default BackEnd;
