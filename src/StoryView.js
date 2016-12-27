/* @flow */

import React, { Component } from 'react'
import { fetchComments } from 'hacker-news-example'

import type { Comment, CommentTree, Story } from 'hacker-news-example'

type StoryViewProps = {
  story: Story,
}

type StoryViewState = {
  commentTree?: CommentTree[],
  error?: Error,
}

export default class StoryView extends Component<void, StoryViewProps, StoryViewState> {
  state: StoryViewState

  constructor(props: Story) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    fetchComments(this.props.story)
      .then(commentTree => {
        this.setState({ commentTree })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  render() {
    const { error, commentTree } = this.state

    let content
    if (error) {
      content = <p className="error">{error.message}</p>
    }
    else if (commentTree) {
      if (commentTree.length > 0) {
        content = <Comments commentTree={commentTree} />
      }
      else {
        content = <p className="noContent">no comments</p>
      }
    }
    else {
      content = <p className="loading">loading...</p>
    }

    return content
  }
}

type CommentTreeProps = {
  commentTree: CommentTree[],
}

function Comments(props: CommentTreeProps): React.Element<*> {
  return <ul>
    {props.commentTree.map(({ comment, kids }) => {
      if (kids.length > 0) {
        return <div className="comment-subtree" key={comment.id}>
          <CommentView comment={comment} />
          <Comments commentTree={kids} />
        </div>
      }
      else {
        return <div className="comment-leaf" key={comment.id}>
          <CommentView comment={comment} />
        </div>
      }
    })}
  </ul>
}

type CommentViewProps = {
  comment: Comment,
}

function CommentView(props: CommentViewProps): React.Element<*> {
  const { comment } = props
  const html = { __html: comment.text }
  return <div className="comment">
    {comment.by} commented: <div dangerouslySetInnerHTML={html} />
  </div>
}
