class BinarySearchTree{
  constructor(key=null,value=null,parent=null){
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value){
    if(this.key === null){
      this.key = key;
      this.value = value;
    }
    else if(key < this.key){
      if(this.left === null){
        this.left = new BinarySearchTree(key, value, this);
      }
      else{
        this.left.insert(key,value);
      }
    }
    else{
      if(this.right === null){
        this.right = new BinarySearchTree(key, value, this);
      }
      else{
        this.right.insert(key,value);
      }
    }
  }

  get(key) {
    if (this.key === key) {
      return this.value;
    }
    else if (key < this.key && this.left) {
      this.left.get(key);
    }
    else if (key > this.key && this.right) {
      return this.right.get(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        // successor = this.left._findMax();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      else if (this.left) {
        this._replaceWith(this.left);
      }
      else if (this.right) {
        this._replaceWith(this.right);
      }
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      }
      else if (this === this.parent.right) {
        this.parent.right = node;
      }
      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}

function populateRandom(count, tree){
  for(let i=0; i<count; i++){
    let num = i + Math.floor(Math.random() * 10);
    console.log('inserting:', num);
    tree.insert(num);
  }
//   console.log(testTree);
}

const myArr = [4,8,15,16,23,42];

function binaryArrSearch(arr,input,startIndex=0,endIndex=arr.length){
  console.log('tick');
  let middle = Math.floor((endIndex+startIndex) / 2);
  if(arr[middle] === input){
    return arr[middle];
  }
  else if(arr[middle] > input){
    return binaryArrSearch(arr,input,startIndex,middle-1);
  }
  else if(arr[middle] < input){
    return binaryArrSearch(arr,input,middle+1, endIndex);
  }
}

// console.log(binaryArrSearch(myArr, 23));

function dfs(tree, val) {
    if (tree.left) {
        dfs(tree.left, val);
    }
    
    console.log(tree.key);
    
    if (tree.right) {
        dfs(tree.right, val);
    }
}

const bst = new BinarySearchTree();
// populateRandom(10, bst);
// bst.insert()
// console.log(dfs(bst, 5))


function bfs(tree, values=[]){
  const q = [tree];

  while (q.length){
    const node = q.shift();
    values.push(node.key);

    if(node.left){
      q.push(node.left);
    }

    if(node.right){
      q.push(node.right);
    }
  }
  return values;
}

// Exercise 1
// just use a linear search


// Exercise 2
// let str = "89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5 76 62";
// const arr = str.split(' ').map(n => Number(n)).sort((a, b) => a - b);
// console.log(binaryArrSearch(arr, 45));


// Exercise 3
// Skipped for now


//Exercise 4
const ex4Tree = new BinarySearchTree;
function populateTree(valArr, tree){
  for(let i=0; i<valArr.length; i++){
    tree.insert(valArr[i], valArr[i]);
  }
  // console.log('Tree: ', heightTree);
}
let str = '25 15 50 10 24 35 70 4 12 18 31 44 66 90 22';
const arr = str.split(' ').map(n => Number(n));
populateTree(arr, ex4Tree);

function dfsPreOrder(tree, val) {
  console.log(tree.key);
  if (tree.left) {
    dfsPreOrder(tree.left, val);
  }
  if (tree.right) {
    dfsPreOrder(tree.right, val);
  }
}

function dfsInOrder(tree, val) {
  if (tree.left) {
    dfsInOrder(tree.left, val);
  }
  console.log(tree.key);
  if (tree.right) {
    dfsInOrder(tree.right, val);
  }
}

function dfsPostOrder(tree, val) {
  if (tree.left) {
    dfsPostOrder(tree.left, val);
  }

  if (tree.right) {
    dfsPostOrder(tree.right, val);
  }
  console.log(tree.key);
}
console.log('<<<<<<<<< PRE ORDER >>>>>>>>>>');
dfsPreOrder(ex4Tree);
console.log();
console.log();
console.log('<<<<<<<<< IN ORDER >>>>>>>>>>');
dfsInOrder(ex4Tree);
console.log();
console.log();
console.log('<<<<<<<<< POST ORDER >>>>>>>>>>');
dfsPostOrder(ex4Tree);