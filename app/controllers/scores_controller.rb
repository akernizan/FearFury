class ScoresController < ApplicationController
	def index
		# Pry.start(binding)
		@scores = Score.all.sort_by{ |num| num.total }

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
			params.require(:score).permit(:player, :total)
		end

end
