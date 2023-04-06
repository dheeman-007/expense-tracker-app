json.array! comments.each do |cmt|
    json.extract! cmt, :name,:text
end