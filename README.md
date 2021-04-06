# Software Enginnering Project
#### Team Members

|Enrollment No.|Name|GithubId|
|--------------|----|--------|
|IIT2019113|Nimish Upadhyay|DEADPOOL2001|
|IIT2019120|Nikil Chouriya|Nikilchouriya|
|IIT2019094|Sangam Barnwal|sangam65|
|IIT2019098|Abhinav|Abhinav|

group no. - 24
---
## About Project


---
## How to use code

Download project
```
git clone https://github.com/DEADPOOL2001/DaaAssingment1.git
```
Project Initialize 
```
#Opening Assingment folder
cd DaaAssingment1

#Compiling The code
g++ daa.cpp -o output
```
---

Run the code
```
./output
```
Input
```
First line of input contains two space seperated integers n and m.
where n and m are no. of rows and no. of coloumns respectively.
```
Ouput 
```
Minimum possible absolute difference between any two elements belonging to the consecutive rows.
```
---
**Test case**

Test Case-1
```
Input:
7 8
Output:
512
```

Test Case-2
```
Input:
5 5
Output:
112
```
---
### Theory
Logic
```
We will select two consecutive rows and iterate over a row and find the two elements(if they exist) in another row , just small or equal element then our current element and just larger element the our current element.
```
Implementation
```
We will randomly generate our 2-d array of size given by the user using rand function and sort all the rows using merge sort.Then we will iterate over the rows from first row to second last row and find the upperbound of the current element using binary search in the next row and if the absolute difference comes out to be lesser then our current answer then we will store it.
```
---
### Analysis

**Time Complexity**
```
For all the cases : o(n*m*(log(m))
```
**Space Complexity**
```
For all the cases : o(n*m)
```
where n is no. of rows and m is no. of coloumns in our matrix.

---
### References

GFG : Divide and Conquer

Tutorials Point : UpperBound
