import { Comment, NestedComment } from '@/types/comment'

export function buildCommentTree(comments: Comment[]) {
  const map: Record<string, NestedComment> = {}
  const tree: NestedComment[] = []

  // Initialize the map with shallow copies to avoid mutating original data
  for (const comment of comments) {
    map[comment.id] = { ...comment, children: [] }
  }

  // Build the tree by linking children to their parents
  for (const item of comments) {
    const currentNode = map[item.id]

    if (currentNode.parentId !== null) {
      // If it has a parent, push it into the parent's children array
      if (map[currentNode.parentId]) {
        map[currentNode.parentId].children.push(currentNode)
      }
    } else {
      // If parentId is null, it's a root node
      tree.push(currentNode)
    }
  }

  return tree
}
