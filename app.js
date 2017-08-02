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