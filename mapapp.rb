require 'sinatra'
require 'haml'
require 'json'
VALID_MEMBER_STATES = %w(AZ CA CO CT FL MA OH OR TN TX WA)

get '/' do
  @valid_member_states = VALID_MEMBER_STATES
  haml :index
end
