const fs = require( 'fs' );
const path = require( 'path' );
class Io {
    dir;
    constructor ( dir ) {
        this.dir = dir;
    }
    async read() {
        const alltour = await JSON.parse(
          await fs.promises.readFile(
            path.join(__dirname, "..", "model", "tour.json")
          )
        );
        return alltour
    }
    async 
 }