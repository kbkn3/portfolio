import { describe, expect, it } from "vitest"
import { generateStableId } from "./cache"

describe("generateStableId", () => {
  it("同じ入力に対して同じIDを返す", () => {
    const id1 = generateStableId("test-input")
    const id2 = generateStableId("test-input")
    expect(id1).toBe(id2)
  })

  it("異なる入力に対して異なるIDを返す", () => {
    const id1 = generateStableId("input-a")
    const id2 = generateStableId("input-b")
    expect(id1).not.toBe(id2)
  })

  it("空文字列に対してIDを返す", () => {
    const id = generateStableId("")
    expect(id).toBeDefined()
    expect(typeof id).toBe("string")
  })

  it("base36形式の文字列を返す", () => {
    const id = generateStableId("test")
    expect(id).toMatch(/^[0-9a-z]+$/)
  })

  it("日本語文字列でも安定したIDを返す", () => {
    const id1 = generateStableId("日本語テスト")
    const id2 = generateStableId("日本語テスト")
    expect(id1).toBe(id2)
  })
})
