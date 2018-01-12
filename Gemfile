source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem 'rails', '~> 5.1.4'
# Use sqlite3 as the database for Active Record
gem 'sqlite3'
# Use Puma as the app server
gem 'puma', '~> 3.7'
gem 'paperclip', '~> 5.1'
gem 'rack-cors', '~> 1.0', '>= 1.0.2'
gem 'rack-attack', '~> 5.0', '>= 5.0.1'
gem 'redis-rails', '~> 5.0', '>= 5.0.2'
gem 'sidekiq', '~> 5.0', '>= 5.0.5'
group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'rspec-rails', '~> 3.7', '>= 3.7.2'
  gem 'rack-test', '~> 0.8.2'
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end
group :test do
  gem 'factory_bot', '~> 4.8', '>= 4.8.2'
  gem 'shoulda-matchers', '~> 3.1', '>= 3.1.2'
  gem 'faker', '~> 1.8', '>= 1.8.7'
  gem 'database_cleaner', '~> 1.6', '>= 1.6.2'
end
group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
