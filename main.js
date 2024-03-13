class LinkedListNode {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    } 

    toString(callBack) {
        return callBack ? callBack(this.value) : `${this.value}`;
    }
}

class LinkedList {
    constructor(initialValue = null) {
        if (!initialValue) {
            this.head = null;
            this.tail = null;
            return;
        }
        this.append(initialValue);
    }

    prepend(value) {
        const newNode = new LinkedListNode(value, this.head);

        this.head = newNode;

        if (!this.tail) this.tail = newNode;

        return this;
    }

    append(value) {
        const newNode = new LinkedListNode(value);

        if (!this.head || !this.tail) {
            this.head = newNode;
            this.tail = newNode;

            return this;
        }

        this.tail.next = newNode;
        this.tail = newNode;

        return this;
    }

    toArray() {
        const nodes = [];

        let currentNode = this.head;

        while(currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }

    fromArray(array) {
        array.forEach(element => this.append(element));

        return this;
    }

    toString(callBack) {
        return this.toArray().map(node => node.toString(callBack)).toString()
    }
}


const matrix = [
    [ 5, 7, 5, 1, 40 ],
    [ 3, 5, 4, 2, 60 ],
    [ 4, 5, 4, 3, 60 ],
    [ 5, 2, 3, 4, 100 ],
    [ 50, 100, 50, 50, null ]
]

const linkedList = new LinkedList();
linkedList.fromArray(matrix);

console.log(linkedList)

const REQ_INDEX = matrix.length - 1;
const STOCK_INDEX = matrix[0].length - 1;

function isSumEqual(matrix) {
    let reqSum, stockSum = 0;
    
    reqSum = matrix[REQ_INDEX].reduce((prev, current) => prev += current, 0);
    for (let row = 0; row < matrix.length; row++) {
        stockSum += matrix[row][STOCK_INDEX];
    }

    return reqSum === stockSum;
}

function countDifference(matrix) {
    let reqSum, stockSum = 0;
    
    reqSum = matrix[REQ_INDEX].reduce((prev, current) => prev += current, 0);
    for (let row = 0; row < matrix.length; row++) {
        stockSum += matrix[row][STOCK_INDEX];
    }

    return reqSum > stockSum ? reqSum - stockSum : stockSum - reqSum;
}

function addConsumer(matrix, difference) {
    for (let row = 0; row < REQ_INDEX; row++) {
        matrix[row].splice(STOCK_INDEX, 0, 0);
    }
    matrix[REQ_INDEX].splice(STOCK_INDEX, 0, difference);
}

function northWest(matrix) {

}


function solve(matrix) {
    if (!isSumEqual(matrix)) {
        let difference = countDifference(matrix);
        addConsumer(matrix, difference);
    }

    console.log(matrix);
}
