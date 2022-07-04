/*
  4 - Pick
  -------
  by Anthony Fu (@antfu) #easy #union #built-in
  
  ### Question
  
  Implement the built-in `Pick<T, K>` generic without using it.
  
  Constructs a type by picking the set of properties `K` from `T`
  
  For example
  
  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }
  
  type TodoPreview = MyPick<Todo, 'title' | 'completed'>
  
  const todo: TodoPreview = {
      title: 'Clean room',
      completed: false,
  }
  ```
  
  > View on GitHub: https://tsch.js.org/4
*/


/* _____________ Your Code Here _____________ */

type MyPick<T, K extends keyof T> = Pick<T, K>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>,
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4/answer
  > View solutions: https://tsch.js.org/4/solutions
  > More Challenges: https://tsch.js.org
*/

/* _____________ 문제 해결 과정 _____________ */
/*
    type MyPick<T, K extends keyof T> = Pick<T, K>;
    
    ts의 유틸리티 타입 중 Pick 을 직접 만들어보는 문제였다.
    문제의 핵심은 MyPick에서 제네릭 두번째 인자로 받는 K가 T 타입의 키 중 하나임을 명시해야하는 것이었고, K extends keyof T 로 선언하여 해결할 수 있었다.
    
    처음에는 이를 제네릭에 선언하는 방식일줄 몰라서 조건부 타입을 통해 type MyPick<T, K> = K extends keyof T ? Pick<T, K> : never; 이런 형식으로 해결하려 했다. 
    하지만 이렇게 작성했을 경우 MyPick<Todo, 'title' | 'completed'> 에서 'title' | 'completed' 부분을 boolean 타입으로 잡는 것을 확인할 수 있었다. 
    그래서 제네릭에서 타입을 먼저 잡아주었고 문제를 해결할 수 있었다.
*/
