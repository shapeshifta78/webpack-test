import './js/file1';
import myModule from './js/file2';
import { add, subtract } from './js/file3';

myModule();

const total = add(2,3);
console.log(total);
console.log(subtract(11,1));