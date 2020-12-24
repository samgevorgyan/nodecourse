export const makeLogin = (req?, res?): void => {
  console.log('hello');
  res.send({ dd: 'hello world' });
};

export const makeLoginPost = (req?, res?): void => {
  console.log('hello jan  jane jan 1  2 3 4 5   ', req.body);
  res.send(req.body);
};
