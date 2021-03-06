class ScoresController < ApplicationController
	def index
		# Pry.start(binding)
		@scores = Score.all.sort { |a,b| b[:total] <=> a[:total] }

		respond_to do |format|
			format.html
			format.json {render :json => @scores}
		end
	end

	def create
	
		@score = Score.create(score_params)

		respond_to do |format|
			format.json {render :json => @score}
		end
	end

	private
		def score_params
			params.require(:scores).permit(:player, :total)
		end

end
