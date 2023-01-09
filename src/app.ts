import { app } from './server';

const PORT = process.env.PORT || 4003;

app.listen(PORT, () => {
  console.log(`API is running on port: ${PORT}`);
});
