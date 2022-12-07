"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePersons = void 0;
function parsePersons(persons) {
    let output = '';
    persons.map(person => {
        output += '(';
        output += `'${person.name}', '${person.description}', '${person.image_url}'`;
        output += '),';
    });
    output = output.slice(0, output.length - 1);
    return output;
}
exports.parsePersons = parsePersons;
//# sourceMappingURL=person.js.map