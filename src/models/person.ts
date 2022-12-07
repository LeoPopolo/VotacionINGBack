export interface Person {
    id: number;
    name: string;
    description: string;
    image_url: string;
    votes_quantity: number;
}

export function parsePersons(persons: Person[]) {
    let output = '';

    persons.map(person => {
        output += '(';
        output += `'${person.name}', '${person.description}', '${person.image_url}'`;
        output += '),';
    });

    output = output.slice(0, output.length - 1);

    return output;
}