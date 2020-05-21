const jwt = require("jsonwebtoken");
let key = '746f4325c687b8823db156b7c9e98dd665a1e3777f501997345b19d9bd99e118754928e78011b5b1bfd66482a17f87bab58bd0d4311f8a9141359a42ddfea07f'


function generarTokenEvaluador(persona) {
    delete persona.clave;
    let token = jwt.sign(persona, key);
    return token;
}

function descriptoken(token) {
    return jwt.decode(token);
}

let user = { id: '1001', modulo: 'lkasfdk', rol: "kldjñalkjfdakfakl", juan: 'añdlkfjadf' }

console.log(generarTokenEvaluador(user))
console.log(descriptoken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQwNDAiLCJub21icmUiOiJTdWF6b3JyaXMiLCJhcGVsbGlkb3MiOiJTdWF6b3JyaXMiLCJlZGFkIjoiMCIsImNvcnJlbyI6ImFsZWphbmRyb3N1YXphLjEwMjJAZ21haWwuY29tIiwiY2l1ZGFkIjoiIiwib2N1cGFjaW9uIjoib3RybyIsInJvbCI6MiwiZW50aWRhZCI6bnVsbCwiYWZpbGlhY2lvbl9pbnN0aXR1Y2lvbmFsIjpudWxsLCJkZXNjcmlwY2lvbiI6bnVsbCwicHJpbWVyYV92ZXoiOmZhbHNlLCJpYXQiOjE1OTAwMjA4ODAsImV4cCI6MTU5MDAzNTI4MH0.kqns3Ven3zE1e5a0zZnlcEm0Zd560ACv0l_SL1t9c7M"))