require 'sinatra'

get '/' do 
	erb :home
end

get '/2P' do
	erb :Two
end

get '/1P' do
	erb :main
end

get '/Rules' do
	erb :Rules
end