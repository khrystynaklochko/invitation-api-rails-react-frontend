module Location
  extend ActiveSupport::Concern

  def closest(customers, office_location, range)
    names = []
    customers.each do |customer|
      if calculate_distance(office_location, customer['latitude'].to_f, customer['longitude'].to_f) <= range
         names << { user_id: customer['user_id'], name: customer['name'] }
      end
    end
    names.sort_by!{ |k| k[:user_id]} if !names.empty?
    to_array(names)
  end

  def to_array(names)
    array = []
    names.each do |name|
        array << "#{name[:user_id]} : #{name[:name]},\n" if name != names[names.count-1]
        array << "#{name[:user_id]} : #{name[:name]}.\n" if name === names[names.count-1]
    end
    array
  end

  def calculate_distance(office_location, latitude, longitude)
     6371 * Math.acos(
       Math.sin(in_radians(latitude)) * Math.sin( in_radians(office_location[:latitude])) +
       Math.cos(in_radians(latitude)) * Math.cos(in_radians(office_location[:latitude])) * Math.cos(in_radians(office_location[:longitude]) - in_radians(longitude))
     )
  end

  private

  def in_radians(degrees)
    degrees * Math::PI / 180
  end
end
