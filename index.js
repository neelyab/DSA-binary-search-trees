class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    insert(key, value) {
        // If the tree is empty then this key being inserted is the root node of the tree
        if (this.key == null) {
            this.key = key;
            this.value = value;
        }

        /* If the tree already exists, then start at the root, 
           and compare it to the key you want to insert.
           If the new key is less than the node's key 
           then the new node needs to live in the left-hand branch */
        else if (key < this.key) {
            /* If the existing node does not have a left child, 
               meaning that if the `left` pointer is empty, 
               then we can just instantiate and insert the new node 
               as the left child of that node, passing `this` as the parent */
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this);
            }
            /* If the node has an existing left child, 
               then we recursively call the `insert` method 
               so the node is added further down the tree */
            else {
                this.left.insert(key, value);
            }
        }
        // Similarly, if the new key is greater than the node's key 
          // then you do the same thing, but on the right-hand side */
        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            }
            else {
                this.right.insert(key, value);
            }
        }
    }
    find(key) {
        // If the item is found at the root then return that value
        if (this.key == key) {
            return this.value;
        }
        /* If the item you are looking for is less than the root 
           then follow the left child.
           If there is an existing left child, 
           then recursively check its left and/or right child
           until you find the item */
        else if (key < this.key && this.left) {
            return this.left.find(key);
        }
        /* If the item you are looking for is greater than the root 
           then follow the right child.
           If there is an existing right child, 
           then recursively check its left and/or right child
           until you find the item */
        else if (key > this.key && this.right) {
            return this.right.find(key);
        }
        // You have searched the tree and the item is not in the tree
        else {
            throw new Error('Key Error');
        }
    }
    remove(key) {
        if (this.key == key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }
            /* If the node only has a left child, 
               then you replace the node with its left child */
            else if (this.left) {
                this._replaceWith(this.left);
            }
            /* And similarly if the node only has a right child 
               then you replace it with its right child */
            else if (this.right) {
                this._replaceWith(this.right);
            }
            /* If the node has no children then
               simply remove it and any references to it 
               by calling "this._replaceWith(null)" */
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
}
function tree(t){
    if(!t){
        return 0;
    }
    return tree(t.left) + t.value + tree(t.right)
}


const keys = [3,1,4,6,9,2,5,7]

const numberTree = new BinarySearchTree;

keys.forEach(key => numberTree.insert(key))
function findHeight(tree){
  return  height(tree, 1)
function height(t, count){
    if(t.right === null && t.left === null){
       return count;
    }
    if(t.right && t.left) {
    return Math.max(height(t.right, count + 1), height(t.left, count+1));
    }
    else if(t.right){
        return height(t.right, count +1)
    }
    else {
        return height(t.left, count +1)
    }
}
}


console.log(findHeight(numberTree))


var maxDepth = function(root) {
    // use a handler function since it's easier to write and think about recursive code this way. You start at a num/depth value of 1 because of the definition of depth.
    return maxDepthHandler(root,1)
     
 };
 var maxDepthHandler = function(root, num){
 // here's just base case -- if you get an empty root(because you definitely will at some point, just return a depth of zero because there's nothing in the tree!
 if(root == null){
       return 0
   }
 // this is your terminating case. a leaf node doesn't have any children, and so the root at that point will have null value. at this point just return the depth/num
   if (root.right == null && root.left == null){
       return num
   }
 //Use Math.max to get the highest between the two root depths. the rest of this code is just handling the individual root cases.
   if (root.right && root.left){
       return Math.max( maxDepthHandler(root.right, num+1), maxDepthHandler(root.left, num + 1))
   }  else if (root.right != null){
       return maxDepthHandler(root.right, num+1)
   } else {
       return maxDepthHandler(root.left, num+1)
   }
 };


 console.log(maxDepth(numberTree))