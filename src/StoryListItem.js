/* @flow */

import React, { Component } from 'react'

import type { Story } from 'hacker-news-example'

type StoryListItemProps = {
  story: Story,
  onSelect: () => void,
}

export default class StoryListItem extends Component<void,StoryListItemProps,void> {
  render() {
    const { story } = this.props
    return <p>
      <a href="#" onClick={event => this.onSelect(event)}>{story.title}</a> posted by {story.by}
    </p>
  }

  onSelect(event: Event) {
    event.preventDefault()
    this.props.onSelect()
  }
}
