# == Config ==========================================================
POST_EXT = ".md"
DRAFT_DIR = "_drafts/"
POST_DIR = "_posts/"
BLOG_PATH = "blog/"
EDITOR = "subl"
PORT = 4000
DATE = Time.now.strftime("%Y-%m-%d")
GITHUB_REPO = "yyl29/jekyll-blog"

# == Tasks ===========================================================
task :default do
  system "rake --tasks"
end

desc "Create a post in _drafts and open in the default editor"
task :draft do
  puts "Title of post:"
  print "> "
  title = STDIN.gets.chomp
  check_title(title)
  filename = slugify(title) + POST_EXT
  check_filename(DRAFT_DIR + filename)
  puts "Tags(optional, separate tags with commas):"
  print "> "
  tags = STDIN.gets.chomp
  create_file(DRAFT_DIR, filename, title, tags)
end

desc "Move a post from #{DRAFT_DIR} to #{POST_DIR} under a category"
task :publish do
  puts "Please choose a draft by the assigned number:"
  files = Dir["#{DRAFT_DIR}*#{POST_EXT}"]
  list_options(files, DRAFT_DIR)
  number = get_number((1..files.size))
  filename = files[number.to_i - 1].sub(DRAFT_DIR, "")

  puts "Please choose a category for the post:"
  categories = FileList["#{BLOG_PATH}*"].exclude("#{BLOG_PATH}index.html")
  list_options(categories, BLOG_PATH)
  number = get_number(1..(categories.size + 1))
  category = get_category(number, categories)

  new_dir = File.join(BLOG_PATH, category, POST_DIR)
  new_path = File.join(new_dir, "#{DATE}-#{filename}")
  check_filename(new_path)
  FileUtils.mkdir_p(File.join(new_dir)) unless Dir.exist?(new_dir)
  FileUtils.mv("#{DRAFT_DIR}#{filename}", new_path)
  puts "#{filename} was moved to #{new_dir}."
end

namespace :preview do
  task :site do
    launch_browser
    system "jekyll serve --config _config.yml,_config-dev.yml"
  end

  desc "Preview site with drafts in the default browser"
  task :drafts do
    launch_browser
    system "jekyll serve --drafts --config _config.yml,_config-dev.yml"
  end
end

desc "Preview site in the default browser"
task :preview => 'preview:site'

desc "Deploy site to gh-pages"
task :deploy do
  system "JEKYLL_ENV=production jekyll build"

  Dir.mktmpdir do |tmp|
    cp_r "_site/.", tmp

    pwd = Dir.pwd
    Dir.chdir tmp

    system "git init"
    system "git add ."
    message = "Site updated at #{Time.now}"
    system "git commit -m #{message.inspect}"
    system "git remote add origin https://github.com/#{GITHUB_REPO}"
    system "git push origin master:refs/heads/gh-pages --force"

    Dir.chdir pwd
  end
end

# == Helpers =========================================================
def check_title(title)
  abort "Title cannot be empty." if title.empty?
end

def slugify(title)
  title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
end

def check_filename(path)
  abort "Error! #{path} already exists." if File.exists?(path)
end

def write_file(dir, filename, title, tags)
  File.open(dir + filename, 'w') do |f|
    f.puts <<-EOF.gsub(/^\s+/, "")
    ---
    title: #{title}
    tags: [#{tags}]
    ---
    EOF
  end
  puts "#{filename} was created in #{dir}"
end

def create_file(dir, filename, title, tags)
  check_filename(dir + filename)
  write_file(dir, filename, title, tags)
  system "#{EDITOR} #{dir}#{filename}"
end

def list_options(options, path)
  puts "0: exit"
  options.each_with_index do |val, index|
    puts "#{index + 1}: #{val}".sub(path, "")
  end
  if path == BLOG_PATH
    puts "#{options.size + 1}: Create new category"
  end
end

def get_number(range)
  print "> "
  number = STDIN.gets.chomp
  check_number(number, range)
end

def check_number(number, range)
  exit if number == "0"
  if number =~ /\D/ || !range.include?(number.to_i)
    puts "Please enter a number within #{range}, or enter 0 to exit."
    print "> "
    number = STDIN.gets.chomp
    check_number(number, range)
  else
    number
  end
end

def get_category(number, categories)
  if number.to_i == categories.size + 1
    puts "Name of new category:"
    print "> "
    category = STDIN.gets.chomp
    get_category(number, categories) if category.empty?
  else
    category = categories[number.to_i - 1].sub(BLOG_PATH, "")
  end
  category
end

def open_command
  if RbConfig::CONFIG["host_os"] =~ /mswin|mingw/
    "start"
  elsif RbConfig::CONFIG["host_os"] =~ /darwin/
    "open"
  else
    "xdg-open"
  end
end

def launch_browser
  Thread.new do
    puts "Launching browser for preview..."
    sleep 2
    system "#{open_command} http://localhost:#{PORT}/"
  end
end