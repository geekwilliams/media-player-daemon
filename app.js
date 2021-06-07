import { router, app } from "./api/routes.js";
import * as fs  from 'fs';

// api responds on this port
const port = 8080; 



app.use('/api', router);

app.listen(port, () => {
    console.log("Express listening on port " + port);
});