const uniqueIdGenerator = () => {
  const date = new Date();
  return date.getTime() + JSON.stringify(Math.floor(Math.random() * 1000));
};

export default uniqueIdGenerator;
