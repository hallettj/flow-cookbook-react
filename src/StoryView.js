/* @flow */

import React, { Component } from 'react'
import { fetchComments } from 'hacker-news-example'

import type { Comment, CommentTree, Story } from 'hacker-news-example'

type StoryViewProps = {
  story: Story,
}

type StoryViewState = {
  commentTree?: CommentTree[],
  error?: string,
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
      content = <p className="error">{error}</p>
    }
    else if (commentTree) {
      if (commentTree.length > 0) {
        content = <Comments commentTree={commentTree} />
      }
      else {
        content = <p>no comments</p>
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

class Comments extends Component<void, CommentTreeProps, void> {
  render() {
    return <ul>
      {this.props.commentTree.map(({ comment, kids }) => {
        if (kids.length > 0) {
          return <div className="comment-subtree">
            <CommentView comment={comment} />
            <Comments commentTree={kids} />
          </div>
        }
        else {
          return <div className="comment-leaf">
            <CommentView comment={comment} />
          </div>
        }
      })}
    </ul>
  }
}

type CommentViewProps = {
  comment: Comment,
}

class CommentView extends Component<void, CommentViewProps, void> {
  render() {
    const { comment } = this.props
    return <p className="comment">
        {comment.by} commented: {comment.text}
    </p>
  }
}