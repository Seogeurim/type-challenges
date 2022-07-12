/*
  7 - Readonly
  -------
  by Anthony Fu (@antfu) #easy #built-in #readonly #object-keys
  
  ### Question
  
  Implement the built-in `Readonly<T>` generic without using it.
  
  Constructs a type with all properties of T set to readonly, meaning the properties of the constructed type cannot be reassigned.
  
  For example:
  
  ```ts
  interface Todo {
    title: string
    description: string
  }
  
  const todo: MyReadonly<Todo> = {
    title: "Hey",
    description: "foobar"
  }
  
  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property
  ```
  
  > View on GitHub: https://tsch.js.org/7
*/


/* _____________ Your Code Here _____________ */

type MyReadonly<T> = {
  readonly[E in keyof T]: T[E];
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>,
]

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}

interface Todo {
  title: string
  description: string
}
const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar"
}

// todo.title = "Hello" // Error: cannot reassign a readonly property
// todo.description = "barFoo" // Error: cannot reassign a readonly property



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/7/answer
  > View solutions: https://tsch.js.org/7/solutions
  > More Challenges: https://tsch.js.org
*/

/* _____________ 문제 해결 과정 _____________ */
/*
    type MyReadonly<T> = {
      readonly[E in keyof T]: T[E];
    }
    ts의 유틸리티 타입 중 Readonly를 직접 만들어보는 문제였다.
    우선 제네릭으로 선언한 T 타입에 대해 key를 하나씩 돌면서 readonly로 정의해줘야겠다는 생각이 들었다. 
    지난번 Pick 구현 문제를 풀면서 'Mapped Types'를 사용하면 타입에 대한 key를 하나씩 돌 수 있다는 것을 알게 되었다. 
    여기서 더 나아가서 [E in keyof T]: T[E] 로 코드를 작성하면 T의 key들을 돌면서 빼낸 E라는 프로퍼티와, 그 프로퍼티에 대한 타입인 T[E]까지 빼낼 수 있다는 것을 공식 문서에서 확인할 수 있었다. 
    그리고 readonly를 그 앞에 붙여주면 해당 타입에 대해 readonly 읽기 전용 타입으로 지정할 수 있음을 자료를 참고해 알 수 있었다. 이를 조합했을 때 위와 같이 풀이할 수 있었다.
    
    참고한 자료
    📄 TS 공식문서 > Utility Types > Readonly<Type> : https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype
    📄 TS 공식문서 > Mapped Types > Mapping Modifiers : https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#mapping-modifiers
    📄 TypeScript Deep Dive > 읽기 전용(readonly) > 편리한 불변성 지원 : https://radlohead.gitbook.io/typescript-deep-dive/type-system/readonly#undefined-1
*/
