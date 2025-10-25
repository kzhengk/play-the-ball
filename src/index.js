// Minimal entrypoint for play-the-ball demo
function hello(name = 'world') {
  return `Hello, ${name}!`;
}

if (require.main === module) {
  console.log(hello());
}

module.exports = { hello };
