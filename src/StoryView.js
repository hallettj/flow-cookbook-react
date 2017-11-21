/* @flow */

import * as React from 'react'
import { fetchComments } from 'flow-cookbook-hacker-news'

import type {
  Comment,
  CommentTree,
  DeletedComment,
  Story,
} from 'flow-cookbook-hacker-news'

type StoryViewProps = {
  story: Story,
  onNavigateBack: () => void,
}

type StoryViewState = {
  commentTree?: CommentTree[],
  error?: Error,
}

export default class StoryView extends React.Component<StoryViewProps, StoryViewState> {
  constructor(props: StoryViewProps) {
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
    const { commentTree, error } = this.state

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

    return <div>
      <a href="#" onClick={event => this.navigateBack(event)}>
        ← back to stories
      </a>
      {content}
    </div>
  }

  navigateBack(event: Event) {
    event.preventDefault()
    this.props.onNavigateBack()
  }
}

type CommentTreeProps = {
  commentTree: CommentTree[],
}

function Comments(props: CommentTreeProps): React.Element<*> {
  return <ul>
    {props.commentTree.map(({ comment, kids }) => {
      if (kids.length > 0) {
        return <li className="comment-subtree" key={comment.id}>
          <CommentView comment={comment} />
          <Comments commentTree={kids} />
        </li>
      }
      else {
        return <li className="comment-leaf" key={comment.id}>
          <CommentView comment={comment} />
        </li>
      }
    })}
  </ul>
}

type CommentViewProps = {
  comment: Comment | DeletedComment,
}

function CommentView(props: CommentViewProps): React.Element<*> {
  const { comment } = props

  if (comment.deleted) {
    return <div className="deleted-comment">
      <em>(deleted)</em>
    </div>
  }

  const html = { __html: comment.text }
  return <div className="comment">
    <em>{comment.by} commented:</em> <div className="comment-body" dangerouslySetInnerHTML={html} />
  </div>
}
