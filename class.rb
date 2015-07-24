Turn = 0

class Board
	attr_accessor :spaces
	attr_accessor :value
	attr_accessor :nxt
	def initialize
		value = ""
		spaces = Array.new
		for i in 0..8
			spaces[i] = ""
		end
	end
	def fork(x)
		num = 0
		for i in 0..2
			if @spaces[3*i].value == x && @spaces[3*i].value == @spaces[3*i + 1].value && @spaces[3*i + 2] == ""
				num = num + 1
			elsif @spaces[3*i].value == x && @spaces[3*i].value == @spaces[3*i + 2].value && @spaces[3*i + 1] == ""
				num = num + 1
			elsif @spaces[3*i + 1].value == x && @spaces[3*i + 1].value == @spaces[3*i + 2].value && @spaces[3*i] == ""
				num = num + 1
			end
			if @spaces[i].value == x && @spaces[i].value == @spaces[i+3].value && @spaces[i+6].value == ""
				num = num + 1
			elsif @spaces[i].value == x && @spaces[i].value == @spaces[i+6].value && @spaces[i+3].value == ""
				num = num + 1
			elsif @spaces[i+3].value == x && @spaces[i+3].value == @spaces[i+6].value && @spaces[i].value == ""
				num = num + 1
			end
		end
		if @spaces[0].value == x && @spaces[0].value == @spaces[4].value && @spaces[8].value == ""
			num = num + 1
		elsif @spaces[0].value == x && @spaces[0].value == @spaces[8].value && @spaces[4].value == ""
			num = num + 1
		elsif @spaces[4].value == x && @spaces[4].value == @spaces[8].value && @spaces[0].value == ""
			num = num + 1
		end
		if @spaces[2].value == x && @spaces[2].value == @spaces[4].value && @spaces[6].value == ""
			num = num + 1
		elsif @spaces[2].value == x && @spaces[2].value == @spaces[6].value && @spaces[4].value == ""
			num = num + 1
		elsif @spaces[4].value == x && @spaces[4].value == @spaces[6].value && @spaces[2].value == ""
			num = num + 1
		end
		return num
	end
	def corner(x)
		@spaces[0].value == x || @spaces[2].value == x || @spaces[6].value == x ||	@spaces[8].value == x
	end
	def side(x)
		@spaces[1].value == x || @spaces[3].value == x || @spaces[5].value == x ||	@spaces[7].value == x
	end
	def point
		a = 0
		if @value == "x"
			a = 6
		elsif @value == "o"
			a = -6
		else
			x = fork("x")
			o = fork("o")
			if x > 1
				a = 5
			elsif o > 1
				a = 5
			elsif x == 1
				a = 4
			elsif o == 1
				a = -4
			else
				if @spaces[4].value == "x"
					a = 3
				elsif @spaces[4].value == "o"
					a = -3
				else
					if corner("x")
						a = 2
					elsif corner("o") 
						a = -2
					else
						if side("x")
							a = 1
						elsif side("o")
							a = -1
						else 
							a = 0
						end
					end
				end
			end
		end
		if Turn == 0
			return a
		else
			return -a
		end
	end
	def points
		if spaces[0].is_a? Board
			sum = 0
			sum = sum + 2 * point
			@space.each do |item|
				sum = sum + item.point
			end
			return sum
		else
			return point
		end
	end
end

class Space
	attr_accessor :value
	attr_accessor :num
	def initialize
		value = ""
	end
end

W = Board.new
W.nxt = -1

for i in 0..8
	W.spaces[i] = Board.new
	for j in 0..8
		W.spaces[i].spaces[j] = Space.new
		W.spaces[i].spaces[j].num = 10*i + j
	end
end

#Returns an array of empty spaces in a board
def empty(x)
	i = 0
	a = Array.new
	x.spaces.each do |item|
		if item.value == ""
			a[i] = item
			i = i + 1
		end
	end
	a
end

def check(a, b, c)
	case c
	when 0
		if a.spaces[c] == a.spaces[c+1] && a.spaces[c] == a.spaces[c+2]
			a.value = b
		elsif a.spaces[c] == a.spaces[c+3] && a.spaces[c] == a.spaces[c+6]
			a.value = b
		elsif a.spaces[c] == a.spaces[c+4] && a.spaces[c] == a.spaces[c+8]
			a.value = b
		end
	when 1
		if a.spaces[c] == a.spaces[c+1] && a.spaces[c] == a.spaces[c-1]
			a.value = b
		elsif a.spaces[c] == a.spaces[c+3] && a.spaces[c] == a.spaces[c+6]
			a.value = b
		end
	when 2
		if a.spaces[c] == a.spaces[c-1] && a.spaces[c] == a.spaces[c-2]
			a.value = b
		elsif a.spaces[c] == a.spaces[c+3] && a.spaces[c] == a.spaces[c+6]
			a.value = b
		elsif a.spaces[c] == a.spaces[c+2] && a.spaces[c] == a.spaces[c+4]
			a.value = b
		end
	when 3
		if a.spaces[c] == a.spaces[c+1] && a.spaces[c] == a.spaces[c+2]
			a.value = b
		elsif a.spaces[c] == a.spaces[c+3] && a.spaces[c] == a.spaces[c-3]
			a.value = b
		end
	when 4
		if a.spaces[c] == a.spaces[c+1] && a.spaces[c] == a.spaces[c-1]
			a.value = b
		elsif a.spaces[c] == a.spaces[c+3] && a.spaces[c] == a.spaces[c-3]
			a.value = b
		elsif a.spaces[c] == a.spaces[c+4] && a.spaces[c] == a.spaces[c-4]
			a.value = b
		elsif a.spaces[c] == a.spaces[c+2] && a.spaces[c] == a.spaces[c-2]
			a.value = b
		end
	when 5
		if a.spaces[c] == a.spaces[c-1] && a.spaces[c] == a.spaces[c-2]
			a.value = b
		elsif a.spaces[c] == a.spaces[c+3] && a.spaces[c] == a.spaces[c-3]
			a.value = b
		end
	when 6
		if a.spaces[c] == a.spaces[c+1] && a.spaces[c] == a.spaces[c+2]
			a.value = b
		elsif a.spaces[c] == a.spaces[c-3] && a.spaces[c] == a.spaces[c-6]
			a.value = b
		elsif a.spaces[c] == a.spaces[c-2] && a.spaces[c] == a.spaces[c-4]
			a.value = b
		end
	when 7
		if a.spaces[c] == a.spaces[c-1] && a.spaces[c] == a.spaces[c+1]
			a.value = b
		elsif a.spaces[c] == a.spaces[c-3] && a.spaces[c] == a.spaces[c-6]
			a.value = b
		end
	when 8
		if a.spaces[c] == a.spaces[c-1] && a.spaces[c] == a.spaces[c-2]
			a.value = b
		elsif a.spaces[c] == a.spaces[c-3] && a.spaces[c] == a.spaces[c-6]
			a.value = b
		elsif a.spaces[c] == a.spaces[c-8] && a.spaces[c] == a.spaces[c-4]
			a.value = b
		end
	end
end

#Takes int corresponding to a space and returns a new board where
#the space is filled appropriately
def move(x)
	a = W
	b = String.new
	if clicks%2 == 0
		b = "x"
	else
		b = "o"
	end

	c = x%9
	d = (x/9).floor

	if empty(a.spaces[d]).length == 0
		a.nxt = -1
	else
	a.nxt = d
	end
	
	a.spaces[d].spaces[c].value = b
	if(a.spaces[d].value == "")
		check(a.spaces[d], b, c)
		if (a.spaces[d].value == b)
			check(a, b, d)
		end
	end
	a
end

#Gives weighted-ish average of all possible scores from given situation
def minimax(x, y, a, b)
	if x.is_a? Board
		return x.points
	elsif x.is_a? Array
		case y%2
		when 0
			c = minimax(x[0], y+1, -1000, a)
			if c > a
				return c
			end
			for i in 1..(x.length-1)
				d = minimax(x[i], y+1, c, a)
				if d > a
					return d
				elsif d > c
					c = d
				end
			end
			return c
		when 1
			c = minimax(x[0], y+1, 1000, a)
			if c < a
				return c
			end
			for i in 1..(x.length-1)
				d = minimax(x[i], y+1, c, a)
				if d < a
					return d
				elsif d < c
					c = d
				end
			end
			return c
		end
	end
end

#Given an array, whose  entries are either boards or array of
#boards, arrays of arrays of boards, etc., replace takes each
#board and replaces it either with itself(if the game is over)
#or an array of all possible following boards
def replace(a)
	c = Array.new
	for i in 0..(a.length-1)
		if a[i].is_a? Board
			if a[i].value != ""
				c[i] = a[i]
			elsif a.nxt == -1
				d = Array.new
				j = 0
				a[i].spaces.each do |item|
					b = empty(item)
					b.each do |item2|
						d[j] = move(item2.num)
						j = j + 1
					end
				end
				c[i] = d
			else 
				d = Array.new
				j = 0
				empty(a.spaces[a.nxt]).each do |item|
					d[j] = move(item.num)
					j = j + 1
				end
				c[i] = d
			end
		elsif a[i].is_a? Array
			c[i] = replace(a[i])
		end
	end
	c
end

def sim(x)
	d = Array.new
	if W.nxt == -1
		i = 0
		W.spaces.each do |item|
			empty(item).each do |item2|
				d[i] = item2.num
				i = i + 1
			end
		end
	else
		i = 0
		empty(W.spaces[W.nxt]).each do |item|
			d[i] = item.num
			i = i + 1
		end
	end
	e = Array.new
	for i in 0..(d.length -1)
		e[i] = move(d[i])
		i = i + 1
	end
	for i in 1..x
		e = replace(e)
		i = i + 1
	end
	f = Hash[d.zip(e)]
	f.max_by{|key, value| minimax(value, 0, 1000, -1000)}[0]
end









