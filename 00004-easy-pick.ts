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

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

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
    type MyPick<T, K extends keyof T> = {
      [P in K]: T[P];
    };

    ts의 유틸리티 타입 중 Pick 을 직접 만들어보는 문제였다. 문제의 핵심은 다음과 같다. 
    ✅ MyPick에서 제네릭 두번째 인자로 받는 K가 T 타입의 키 중 하나임을 명시해야한다. -> `K extends keyof T`로 선언하여 해결
    ✅ 제네릭으로 받은 타입에 따라 원하는 타입을 만들어줘야 한다. -> Creating Types from Types > Mapped Types 로 해결
    
    🏃 처음에는 조건부 타입을 통해 `type MyPick<T, K> = K extends keyof T ? Pick<T, K> : never;` 이런 형식으로 해결하려 했다. 
    하지만 이렇게 작성했을 경우 `MyPick<Todo, 'title' | 'completed'>` 에서 `'title' | 'completed'` 부분을 boolean 타입으로 잡는 것을 확인할 수 있었다. 
    그래서 제네릭에서 타입을 먼저 잡아주었고 문제를 해결할 수 있었다.
    🏃 처음에는 Pick을 사용하지 않고 문제를 풀 수 없었다. 
    타입스크립트에서 타입에서 타입을 생성하는 다양한 방법(https://www.typescriptlang.org/docs/handbook/2/types-from-types.html) 중
    Mapped Types(https://www.typescriptlang.org/docs/handbook/2/mapped-types.html) 라는게 있는데, 
    이는 keyof를 통해 생성된 속성키의 union을 사용하여 키를 반복(iterate)해 타입을 생성하는 방식이다. 이를 사용해 Pick을 구현할 수 있다.
    
    > A mapped type is a generic type which uses a union of PropertyKeys (frequently created via a keyof) to iterate through keys to create a type:
    > type OptionsFlags<Type> = {
    >   [Property in keyof Type]: boolean;
    > };
*/
