import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const blogPosts = [
    {
      id: 1,
      title: 'Top 10 Tips for Maintaining Your Air Cooler This Summer',
      category: 'Maintenance',
      author: 'Rajesh Kumar',
      date: '15 Jan 2025',
      readTime: '5 min read',
      image: 'https://via.placeholder.com/400x250',
      excerpt: 'Learn essential maintenance tips to keep your air cooler running efficiently throughout the hot summer months...',
      tags: ['Maintenance', 'Summer', 'Tips']
    },
    {
      id: 2,
      title: 'Air Cooler vs Air Conditioner: Which One Should You Choose?',
      category: 'Buying Guide',
      author: 'Priya Sharma',
      date: '12 Jan 2025',
      readTime: '7 min read',
      image: 'https://via.placeholder.com/400x250',
      excerpt: 'A comprehensive comparison between air coolers and air conditioners to help you make the right choice for your home...',
      tags: ['Comparison', 'Buying Guide', 'AC']
    },
    {
      id: 3,
      title: 'How BLDC Technology is Revolutionizing Air Coolers',
      category: 'Technology',
      author: 'Amit Patel',
      date: '10 Jan 2025',
      readTime: '6 min read',
      image: 'https://via.placeholder.com/400x250',
      excerpt: 'Discover how Brushless DC motor technology is making air coolers more energy-efficient and powerful...',
      tags: ['Technology', 'BLDC', 'Innovation']
    },
    {
      id: 4,
      title: '5 Ways to Reduce Your Electricity Bill This Summer',
      category: 'Energy Saving',
      author: 'Sneha Reddy',
      date: '08 Jan 2025',
      readTime: '4 min read',
      image: 'https://via.placeholder.com/400x250',
      excerpt: 'Practical tips and tricks to save on your electricity bills while staying cool during the hot summer season...',
      tags: ['Energy Saving', 'Tips', 'Cost Effective']
    },
    {
      id: 5,
      title: 'Understanding Cooling Capacity: What Size Cooler Do You Need?',
      category: 'Buying Guide',
      author: 'Vikram Singh',
      date: '05 Jan 2025',
      readTime: '5 min read',
      image: 'https://via.placeholder.com/400x250',
      excerpt: 'A detailed guide to help you choose the right cooling capacity based on your room size and requirements...',
      tags: ['Buying Guide', 'Capacity', 'Room Size']
    },
    {
      id: 6,
      title: 'The Science Behind Evaporative Cooling Technology',
      category: 'Technology',
      author: 'Dr. Meera Iyer',
      date: '02 Jan 2025',
      readTime: '8 min read',
      image: 'https://via.placeholder.com/400x250',
      excerpt: 'Explore the scientific principles that make evaporative cooling one of the most eco-friendly cooling solutions...',
      tags: ['Technology', 'Science', 'Eco-Friendly']
    },
    {
      id: 7,
      title: 'Desert Cooler vs Tower Cooler: Key Differences Explained',
      category: 'Product Review',
      author: 'Ankit Verma',
      date: '28 Dec 2024',
      readTime: '6 min read',
      image: 'https://via.placeholder.com/400x250',
      excerpt: 'Understand the key differences between desert coolers and tower coolers to make an informed purchase decision...',
      tags: ['Product Review', 'Comparison', 'Types']
    },
    {
      id: 8,
      title: 'Common Air Cooler Problems and How to Fix Them',
      category: 'Maintenance',
      author: 'Ramesh Gupta',
      date: '25 Dec 2024',
      readTime: '7 min read',
      image: 'https://via.placeholder.com/400x250',
      excerpt: 'Troubleshoot common air cooler issues with our expert guide on identifying and fixing problems quickly...',
      tags: ['Maintenance', 'Troubleshooting', 'DIY']
    },
    {
      id: 9,
      title: 'Best Air Coolers for Small Rooms in 2025',
      category: 'Product Review',
      author: 'Kavita Nair',
      date: '20 Dec 2024',
      readTime: '5 min read',
      image: 'https://via.placeholder.com/400x250',
      excerpt: 'Check out our curated list of the best compact air coolers perfect for small bedrooms and offices...',
      tags: ['Product Review', '2025', 'Small Rooms']
    }
  ];

  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl text-blue-100">Stay updated with the latest news, tips, and insights</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="text-sm text-gray-600">
            <span onClick={() => navigate('/')} className="cursor-pointer hover:text-blue-600">Home</span>
            {' › '}
            <span className="font-medium text-gray-800">Blog</span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white py-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <p className="text-gray-600">Showing {filteredPosts.length} articles</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group">
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1">
                    Read More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-blue-100 mb-8">Get the latest articles, tips, and updates delivered to your inbox</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-6 py-3 rounded-lg w-full sm:w-96 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="px-8 py-3 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-600 transition-colors whitespace-nowrap">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;