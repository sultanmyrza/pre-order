import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { Component } from 'react';
import { ScrollView, Image, TouchableOpacity, View } from 'react-native';
import images from '../../assets/images';

class CategoryScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        { id: 'hamburger', url: images.hamburgerIcon },
        { id: 'ramen', url: images.ramenIcon },
        { id: 'pizza', url: images.pizzaIcon },
        { id: 'steak', url: images.steakIcon },
        { id: 'popcorn', url: images.popcornIcon },
      ],
      selectedCategoryId: 'hamburger',
    };
  }

  handlePress = categoryId => {
    this.setState({ selectedCategoryId: categoryId });
    this.props.changeCategory(categoryId);
  };

  drawUnderline = (a, b) => {
    return <View style={{ height: 5, backgroundColor: 'red' }} />;
  };

  render() {
    return (
      <ScrollView
        horizontal
        contentContainerStyle={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
        {this.state.categories.map(category => (
          <TouchableOpacity key={category.id} onPress={() => this.handlePress(category.id)}>
            <Image source={category.url} style={{ width: 48, height: 48 }} />
            {this.state.selectedCategoryId === category.id &&
              this.drawUnderline(this.state.selectedCategoryId, category.id)}
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}

export default CategoryScroll;
