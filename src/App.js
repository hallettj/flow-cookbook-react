/* @flow */

import React, { Component } from 'react'
import { fetchTopStories } from 'hacker-news-example'
import './App.css'
import StoryListItem from './StoryListItem'
import StoryView from './StoryView'

import type { Story } from 'hacker-news-example'

type AppState = {
  selectedStory?: ?Story,
  stories?: Story[],
  error?: string,
}

class App extends Component<void,void,AppState> {
  // Must declare `state` type in two places
  state: AppState

  constructor(props: void) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    fetchTopStories(15)
      .then(stories => {
        this.setState({ stories })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  render() {
    const { error, selectedStory, stories } = this.state

    let content
    if (error) {
      content = <p className="error">{error}</p>
    }
    else if (selectedStory) {
      content = <StoryView story={selectedStory} />
    }
    else if (stories) {
      content = stories.map(story => (
        <StoryListItem
          story={story}
          onSelect={() => this.selectStory(story)}
          key={story.id}
        />
      ))
    }
    else {
      content = <p className="loading">loading...</p>
    }

    return (
      <div className="App">
        <div className="App-header">
          <h1>Flow Cookbook: React Example</h1>
        </div>
        <div>
          {content}
        </div>
      </div>
    )
  }

  selectStory(story: Story) {
    this.setState({ selectedStory: story })
  }
}

export default App
