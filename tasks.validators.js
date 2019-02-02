const validateId = (id) => {
    if (id === undefined || id === null) {
        throw new Error('Id not given!');
    }
};

const validateIdExists = (id, tasks) => {
    validateId(id);
    let length = tasks.filter(t => t.id === id).length;
    if (length === 0) {
        throw new Error('Id not found!');
    }
};

module.exports = {validateIdExists};
